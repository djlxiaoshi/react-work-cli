/**
 * 分支与环境的关系配置
 */
const branchEnvMap = {
  dev: 'dev',
  test: 'test',
  release: 'prod',
};

const shell = require('shelljs');
const branch = shell.exec('git rev-parse --symbolic-full-name --abbrev-ref HEAD', { silent: true }).toString().trim();
const env = process.argv.slice(2).toString().split('=')[1].toString();

if (branchEnvMap[branch] !== env) {
  shell.echo('该分支对应的编译任务不是这个，请检查执行的命令!', branch, env);
  shell.exit(1);
}
