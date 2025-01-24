import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';

import { theme } from '@/common/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useVideoConversion } from '@/hooks/useVideoConversion';
import { formatDuration, formatFileSize } from '@/utils/format';

export default function VideoToGif() {
  const {
    pickVideo,
    startConversion,
    saveToGallery,
    shareGif,
    isConverting,
    error,
    result,
    selectedVideo,
    isSaved,
    progress,
    resetState,
  } = useVideoConversion();

  const videoPlayer = useVideoPlayer(selectedVideo?.uri || null, (player) => {
    player.loop = true;
  });

  const handleNewVideo = async () => {
    resetState(); // Önce state'i temizle
    await pickVideo(); // Sonra yeni video seçimini başlat
  };

  if (result?.success) {
    return (
      <ScrollView style={styles.container}>
        <Card variant="section">
          <Text style={styles.sectionTitle}>Dönüştürülen GIF</Text>
          <Image source={{ uri: result.outputPath }} style={styles.preview} contentFit="contain" />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Boyut: {formatFileSize(result?.outputInfo?.fileSize)}
            </Text>
            <View style={styles.actionButtons}>
              <Button
                title="Paylaş"
                variant="success"
                style={styles.shareButton}
                onPress={() => result.outputPath && shareGif(result.outputPath)}
              />
              {!isSaved ? (
                <Button
                  title="Galeriye Kaydet"
                  style={styles.saveButton}
                  onPress={() => result.outputPath && saveToGallery(result.outputPath)}
                />
              ) : (
                <Button title="Kaydedildi" variant="disabled" style={styles.saveButton} />
              )}
            </View>
          </View>
        </Card>
        <Button title="Yeni Video Seç" size="large" onPress={handleNewVideo} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {!selectedVideo ? (
        <Card>
          <Text style={styles.title}>Video to GIF Dönüştürücü</Text>
          <Text style={styles.description}>Videoyu seçin ve otomatik olarak GIF'e dönüştürün</Text>
          <Button title="Video Seç" onPress={pickVideo} />
        </Card>
      ) : (
        <Card variant="section">
          <Text style={styles.sectionTitle}>Seçilen Video</Text>
          <VideoView style={styles.preview} player={videoPlayer} nativeControls />
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Boyut: {formatFileSize(selectedVideo.fileSize)}</Text>
            <Text style={styles.infoText}>Süre: {formatDuration(selectedVideo.duration)}</Text>
            <Text style={styles.infoText}>Format: {selectedVideo.type}</Text>
          </View>
          {isConverting ? (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
              <Text style={styles.progressText}>{Math.round(progress)}%</Text>
            </View>
          ) : (
            <Button title="Dönüştürmeyi Başlat" onPress={startConversion} />
          )}
        </Card>
      )}

      {error && (
        <Text style={styles.error}>
          Hata: {error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}
        </Text>
      )}
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#666',
    fontFamily: theme.fonts.regular,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    marginBottom: 10,
  },
  preview: {
    width: width - 64,
    height: (width - 64) * 0.5625,
    backgroundColor: '#000',
    borderRadius: 8,
    marginBottom: 12,
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontFamily: theme.fonts.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  newButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: theme.fonts.medium,
  },
  successContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#4CAF50',
    marginBottom: 8,
  },
  successDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: theme.fonts.regular,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  shareButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
    color: '#000',
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
  },
  savedButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#E0E0E0',
    opacity: 1,
  },
  savedButtonText: {
    color: '#757575',
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
  },
});
