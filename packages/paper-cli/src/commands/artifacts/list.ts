
  import { flags } from "@oclif/command";
  import { BaseCommand } from "../../BaseCommand";

  export default class ArtifactsList extends BaseCommand {
    static description = "List job artifact files for the specified job"
    static flags = {  
    "json": flags.boolean({
      description: "Optional; return JSON object instead of writing to standard out.  '--json' with no value is equivalent to true.",
       
    }), 
    "jobId": flags.string({
      description: "Id of the job to list artifacts for",
      required: true, 
    }), 
    "files": flags.string({
      description: "Optional; wildcard expression of file(s) to list, e.g., \"myfiles*\".  Note: if you include a wildcard you must double-quote the files argument.",
       
    }), 
    "size": flags.boolean({
      description: "Optional; include file size in bytes.  '--size' with no value is equivalent to true.",
       
    }), 
    "links": flags.boolean({
      description: "Optional; include https links to artifacts.  Note: links are only valid for 8 hours. '--links' with no value is equivalent to true.",
       
    }),} 
    async run() {
      await this.auth();
      const params = await this.params(
          this.parse(ArtifactsList).flags,[], [], []
      );
      return this.client.ArtifactsList(params);
    }
  }