import ErrorRepository from '../js/errorRepository';
import {
  Team, Character,
} from '../js/domain';

test('characters should be added correctly', () => {
  const team = new Team();
  team.addAll(new Character('Лучник1', 'Лучник', 10, 2, 25, 25), new Character('Лучник2', 'Лучник', 10, 2, 25, 25), new Character('Лучник2', 'Лучник', 10, 2, 25, 25));

  const expected = new Set();
  expected.add({
    name: 'Лучник1', type: 'Лучник', health: 10, level: 2, attack: 25, defence: 25,
  });
  expected.add({
    name: 'Лучник2', type: 'Лучник', health: 10, level: 2, attack: 25, defence: 25,
  });

  expect(team.characters).toEqual(expected);
});

test('error should be shown when character already exists', () => {
  const team = new Team();
  team.add(new Character('Лучник1', 'Лучник', 10, 2, 25, 25));
  const result = team.add(new Character('Лучник1', 'Лучник', 10, 2, 25, 25));

  const expected = Error('В команде уже есть такой персонаж!');

  expect(result).toEqual(expected);
});

test('error should be shown when team is full', () => {
  const team = new Team();
  team.add(new Character('Лучник1', 'Лучник', 10, 2, 25, 25));
  team.add(new Character('Лучник2', 'Лучник', 10, 2, 25, 25));
  team.add(new Character('Лучник3', 'Лучник', 10, 2, 25, 25));
  team.add(new Character('Лучник4', 'Лучник', 10, 2, 25, 25));
  team.add(new Character('Лучник5', 'Лучник', 10, 2, 25, 25));
  const result = team.add(new Character('Лучник6', 'Лучник', 10, 2, 25, 25));

  const expected = Error('В команде не может быть больше 5 персонажей!');

  expect(result).toEqual(expected);
});

test('error should be shown when team is full (addAll)', () => {
  const team = new Team();
  team.addAll(new Character('Лучник1', 'Лучник', 10, 2, 25, 25), new Character('Лучник2', 'Лучник', 10, 2, 25, 25),
    new Character('Лучник3', 'Лучник', 10, 2, 25, 25), new Character('Лучник4', 'Лучник', 10, 2, 25, 25));
  const result = team.addAll(new Character('Лучник5', 'Лучник', 10, 2, 25, 25), new Character('Лучник6', 'Лучник', 10, 2, 25, 25));

  const expected = Error('В команде не может быть больше 5 персонажей!');

  expect(result).toEqual(expected);
});

test('unknown error for no code in repository', () => {
  const errs = new ErrorRepository();
  const result = errs.getError(3);

  const expected = Error('Unknown Error');

  expect(result).toEqual(expected);
});
