export interface VideoInfo {
  uri: string;
  fileSize: number;
  duration: number;
  type: string;
}

export interface GifInfo {
  uri: string;
  fileSize: number;
}

export interface ConversionResult {
  success: boolean;
  outputPath?: string;
  outputInfo?: {
    fileSize: number;
  };
  error?: string;
}
