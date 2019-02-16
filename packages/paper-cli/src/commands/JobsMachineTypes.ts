
  import {  flags } from "@oclif/command";
  import { BaseCommand } from "../BaseCommand";

  export default class JobsMachineTypes extends BaseCommand {
    static flags = {  
    "region": flags.string({
      description: "Optional region to match on",
      required: undefined,  
    }), 
    "cluster": flags.string({
      description: "Optional cluster to match on",
      required: undefined,  
    }), 
    "machineType": flags.string({
      description: "Optional machine type to macth on",
      required: undefined,  
    }), 
    "isBusy": flags.boolean({
      description: "Optional busy status value to match on",
      required: undefined,  
    }),} 
    async run() {
      await this.auth();
      const params = await this.params(
          this.parse(JobsMachineTypes).flags, [], []
      );
      return this.client.JobsMachineTypes(params);
    }
  }