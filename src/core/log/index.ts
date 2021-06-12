const log = {
  print(message: string): void {
    _content('\x1b[0m', false, message);
  },
  title(message: string): void {
    _content('\x1b[35m', true, message);
  },
  info(message: string): void {
    _content('\x1b[33m', false, message);
  },
  success(message: string): void {
    _content('\x1b[32m', false, message);
  },
  error(message: string): void {
    _content('\x1b[31m', false, message);
  },
};

function _content(color: string, bold: boolean, message: string): void {
  console.log(
    `\x1b[32m[${new Date(Date.now()).toLocaleString()}]\x1b[0m ${color}${bold ? '\x1b[1m' : ''}${message}${
      bold ? '\x1b[22m' : ''
    }\x1b[0m`,
  );
}

export default log;
