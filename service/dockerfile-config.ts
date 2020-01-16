class dockerFileConfig {
  public image: string;
  public nginxImage: boolean;
  constructor(
    image: string,
    nginxImage: boolean
    ) {
    this.image = image;
    this.nginxImage = nginxImage;
  }
}