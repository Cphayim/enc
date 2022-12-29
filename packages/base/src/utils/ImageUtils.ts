import {
  canvastoDataURL,
  canvastoFile,
  compress,
  compressAccurately,
  dataURLtoFile,
  filetoDataURL,
  imagetoCanvas,
  urltoBlob,
  urltoImage,
} from 'image-conversion'

interface ImageEditOptions {
  /**
   * 图片宽度
   */
  width?: number
  /**
   * 图片高度
   */
  height?: number
  /**
   * 图片缩放比例
   */
  scale?: number
}

interface ImageCompressOptions extends ImageEditOptions {
  /**
   * 压缩比例
   */
  quality?: number
}

interface ImageCompressAccuratelyOptions extends ImageEditOptions {
  /**
   * 压缩目标大小，单位 KB
   */
  size?: number
  /**
   * 压缩准确度
   *
   * 当 `size: 1000` `accuracy = 0.9` 时，压缩结果在 900 ~ 1100 KB 之间
   * @default 0.95
   */
  accuracy?: number
}

/**
 * 图片工具类
 */
export class ImageUtils {
  /**
   * 图片文件压缩
   */
  static async compress(file: File, options: number | ImageCompressOptions): Promise<File> {
    const blob = await compress(file, options)
    return new File([blob], file.name)
  }

  /**
   * 图片文件压缩到指定大小
   */
  static async compressAccurately(
    file: File,
    options: number | ImageCompressAccuratelyOptions,
  ): Promise<File> {
    const blob = await compressAccurately(file, options)
    return new File([blob], file.name)
  }

  /**
   * 图片元素转换为 canvas
   */
  static async imageToCanvas(image: HTMLImageElement, options: ImageEditOptions) {
    return imagetoCanvas(image, options)
  }

  /**
   * 图片文件转换为 base64
   */
  static fileToDataURL(file: File): Promise<string> {
    return filetoDataURL(file)
  }

  /**
   * base64 转换为图片文件
   */
  static async dataURLToFile(dataURL: string, filename: string): Promise<File> {
    const blob = await dataURLtoFile(dataURL)
    return new File([blob], filename)
  }

  /**
   * canvas 转换为 base64
   */
  static async canvasToDataURL(canvas: HTMLCanvasElement) {
    return canvastoDataURL(canvas)
  }

  /**
   * canvas 转换为图片文件
   */
  static async canvasToFile(canvas: HTMLCanvasElement, filename: string): Promise<File> {
    const blob = await canvastoFile(canvas)
    return new File([blob], filename)
  }

  /**
   * 图片 URL 转换为 Blob
   */
  static async urlToBlob(url: string): Promise<Blob> {
    return urltoBlob(url)
  }

  /**
   * 图片 URL 转换为图片元素
   */
  static async urlToImage(url: string): Promise<HTMLImageElement> {
    return urltoImage(url)
  }
}
