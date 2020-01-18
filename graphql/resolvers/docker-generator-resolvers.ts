import * as shell from 'shelljs';
export default {
  Mutation: {
    generateDockerFile: async (data: any) => {
      shell.exec(`docker run hello-world`)
    }
  }
}