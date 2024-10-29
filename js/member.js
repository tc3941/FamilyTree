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
    parentA = -1,
    parentB = -1,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.suffix = suffix;
    this.mother = mother;
    this.father = father;
    this.generation = generation;
    this.children = children.map((child) => new Member(child)); // Recursively create Member instances for children
    this.parentA = parentA;
    this.parentB = parentB;
    this.id = id;
  }

  families = [];

  getFullName() {
    return `${this.firstName} ${this.lastName} ${this.suffix}`;
  }
}
