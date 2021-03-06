import { Command } from "@oclif/command";
import Client from "./Client";
import cli from "cli-ux";

export abstract class BaseCommand extends Command {
  public client = new Client();

  async fetchCredentials() {
    return Object.create({
      email: await cli.prompt("Email"),
      password: await cli.prompt("Password", { type: "mask" })
    });
  }

  constructor(...args: any[]) {
    super(args[0], args[1]);
  }

  async auth() {
    return this.client.login(await this.fetchCredentials());
  }

  async prompt<Prmt extends string, Opt extends string, Req extends string>(
    optional: Array<Opt>,
    required: Array<Req>,
    promptable: Array<Prmt>
  ) {
    let result: { [K in Req]: string } &
      { [K in Opt]?: string } &
      { [K in Prmt]: string } = Object.create(null);
    for (let k of promptable) result[k] = await cli.prompt(k);
    for (let k of [...optional, ...required])
      result[k] = await cli.prompt(k, { type: "mask" });
    return result;
  }

  async params<
    T extends {},
    Req extends string,
    Opt extends keyof T & string,
    Prmt extends keyof T & string
  >(
    flags: T,
    optional: Array<Opt>,
    required: Array<Req>,
    promptable: Array<Prmt>
  ) {
    const prompts = await this.prompt(
      optional.filter(k => flags[k]),
      required,
      promptable.filter(k => !flags[k])
    );
    for (let k of optional) delete flags[k];
    return { ...flags, ...prompts } as Pick<T, Exclude<keyof T, Req | Opt>> &
      typeof prompts;
  }
}
