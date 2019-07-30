'use strict';

{
  const INDENT_SPACES = 2;
  const HR = '-'.repeat(12);

  window.logger = {
    level: 0,
    enter(name) {
      const indentation = ' '.repeat(this.level * INDENT_SPACES);
      console.log(`${indentation}entering ${name}`);
      this.level += 1;
    },
    leave(name) {
      this.level -= 1;
      const indentation = ' '.repeat(this.level * INDENT_SPACES);
      console.log(`${indentation}leaving ${name}`);
      if (this.level === 0) {
        console.log(`${HR}WAITING${HR}`);
      }
    },
  };
}
