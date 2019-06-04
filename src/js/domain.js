import ErrorRepository from './errorRepository';

class Team {
  constructor() {
    this.characters = new Set();
  }

  add(char) {
    try {
      if (this.characters.size === 5) {
        throw new Error(1);
      } else {
        const charForSearch = this.toArray().find(e => e.name === char.name);
        if (charForSearch !== undefined) {
          throw new Error(2);
        }

        this.characters.add(char);
        return this.characters;
      }
    } catch (errCode) {
      const errs = new ErrorRepository();
      return errs.getError(Number(errCode.message));
    }
  }

  addAll(...chars) {
    try {
      if (chars.length > 5 || (this.characters.size + chars.length > 5)) {
        throw new Error(1);
      } else {
        for (const item of chars) {
          const charForSearch = this.toArray().find(e => e.name === item.name);
          if (charForSearch === undefined) {
            this.characters.add(item);
          }
        }
      }
      return this.characters;
    } catch (errCode) {
      const errs = new ErrorRepository();
      return errs.getError(Number(errCode.message));
    }
  }

  toArray() {
    return [...this.characters];
  }
}

class Character {
  constructor(name, type, health, level, attack, defence) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.level = level;
    this.attack = attack;
    this.defence = defence;
  }
}

export {
  Team, Character,
};
