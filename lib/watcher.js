const chokidar = require("chokidar");
const chalk = require("chalk");

module.exports = ({ mockDir }) => {
  chokidar
    .watch(mockDir, {
      ignoreInitial: true // 表示是否对增加文件或者增加文件夹的时候进行发送事件，默认值为false表示add/addDir会触发事件
    })
    .on("all", (event, path) => {
      if (event !== "change" && event !== "add") return;
      try {
        // delete require cache
        Object.keys(require.cache).forEach(i => {
          i.includes(mockDir) && delete require.cache[require.resolve(i)];
        });
        console.log(chalk.green(`\n Mock file updated: ${path}`));
      } catch (error) {
        console.log(chalk.red(error));
      }
    });
  console.log(chalk.green("\n Mock server start running!"));
};