import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { FFmpegKit, FFmpegKitConfig } from 'ffmpeg-kit-react-native';
import { useState } from 'react';

import { ConversionResult, VideoInfo } from '@/types/video';

export const useVideoConversion = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoInfo | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const resetState = () => {
    setSelectedVideo(null);
    setSaveSuccess(false);
    setProgress(0);
    videoToGifMutation.reset();
  };

  const convertToGif = async (videoInfo: VideoInfo): Promise<ConversionResult> => {
    try {
      const timestamp = new Date().getTime();
      const outputPath = `${FileSystem.cacheDirectory}output_${timestamp}.gif`;

      await FFmpegKitConfig.enableStatisticsCallback((statistics) => {
        const timeInMilliseconds = statistics.getTime();
        const durationInMilliseconds = videoInfo.duration;
        const currentProgress = (timeInMilliseconds / durationInMilliseconds) * 100;
        setProgress(Math.min(currentProgress, 100));
      });

      await FFmpegKit.execute(
        `-i ${videoInfo.uri} -vf "fps=10,scale=320:-1:flags=lanczos" -y ${outputPath}`
      );

      const newFileInfo = await FileSystem.getInfoAsync(outputPath);

      return {
        success: true,
        outputPath,
        outputInfo: {
          // @ts-ignore
          fileSize: newFileInfo?.size || 0,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu',
      };
    }
  };

  const videoToGifMutation = useMutation({
    mutationFn: convertToGif,
  });

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Galeri izni gerekli');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri, { size: true });
      const videoInfo: VideoInfo = {
        uri: result.assets[0].uri,
        // @ts-ignore
        fileSize: fileInfo?.size || 0,
        duration: result.assets[0].duration || 0,
        type: result.assets[0].type || 'video',
      };
      setSelectedVideo(videoInfo);
    }
  };

  const startConversion = () => {
    if (selectedVideo) {
      videoToGifMutation.mutate(selectedVideo);
    }
  };

  const shareGif = async (uri: string) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        throw new Error('Paylaşım bu cihazda kullanılamıyor');
      }

      await Sharing.shareAsync(uri, {
        mimeType: 'image/gif',
        dialogTitle: 'GIF Paylaş',
      });
    } catch (error) {
      console.error('Paylaşım hatası:', error);
    }
  };

  const saveToGallery = async (uri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await MediaLibrary.saveToLibraryAsync(uri);
      setSaveSuccess(true);
      setTimeout(resetState, 2000);
    }
  };

  return {
    pickVideo,
    startConversion,
    saveToGallery,
    shareGif,
    isConverting: videoToGifMutation.isPending,
    error: videoToGifMutation.error,
    result: videoToGifMutation.data,
    selectedVideo,
    saveSuccess,
    progress,
    resetState,
  };
};
