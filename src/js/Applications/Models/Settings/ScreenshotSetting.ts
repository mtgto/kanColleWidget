import { Model } from "chomex";

/**
 * スクショ関係の設定を保存するモデル
 */
export enum ScreenshotAction {
  OpenPage = "open", // スクショ編集画面をひらく（デフォルト）
  Download = "download", // 直接バックグラウンドでダウンロードする
}

/**
 * 画像のフォーマット
 */
export enum ImageFormat {
  PNG = "png",
  JPEG = "jpeg",
}

export default class ScreenshotSetting extends Model {
  static __ns = "ScreenshotSetting";
  static default = {
    "user": {
      action: ScreenshotAction.OpenPage,
      folder: "艦これウィジェット",
      format: ImageFormat.PNG,
      filename: "スクリーンショット_yyyyMMdd_HHmm",
    },
  };

  // スクショしたあとのアクション
  action: ScreenshotAction;
  // ~/Downloads/ 以下のフォルダ名
  folder: string;
  format: ImageFormat;
  filename: string;

  // 1エンティティモデルなので
  static user(): ScreenshotSetting {
    return this.find("user");
  }

  getFullDownloadPath(): string {
    return [this.folder, this.getFullFileName()].join("/");
  }
  private getFullFileName(): string {
    const now = new Date();
    return now.format(this.filename) + "." + this.format;
  }
}