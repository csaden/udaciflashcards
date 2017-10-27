import faker from 'faker';

faker.seed(2017);

export function getDummyData(sets = 7, items = 5) {
  const data = {};
  let title, question, answer;

  for (let i = 0; i < sets; i++) {
    title = faker.random.word();
    data[title] = {title, questions: []}

    for (let j = 0; j < items; j++) {
      question = faker.random.words() + '?';
      answer = faker.lorem.sentence();
      data[title].questions.push({question, answer});
    }
  }

  return data;
}
