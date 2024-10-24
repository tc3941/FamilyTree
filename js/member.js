export class Member {
  constructor({
    firstName,
    lastName,
    age,
    suffix = '',
    mother = '',
    father = '',
    generation = 0,
    children = [],
    id = 0,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.suffix = suffix;
    this.mother = mother;
    this.father = father;
    this.generation = generation;
    this.children = children.map((child) => new Member(child)); // Recursively create Member instances for children
  }

  families = [];

  getFullName() {
    return `${this.firstName} ${this.lastName} ${this.suffix}`;
  }
}
