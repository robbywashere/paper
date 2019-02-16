import Api from "@paper/paper-api";

console.log({ Api });

export default class Client extends Api {
  async login({ email, password }: { email: string; password: string }) {
    const response = await this.LoginUser({ email, password });
    this.SetToken(response.body.key);
  }
}
