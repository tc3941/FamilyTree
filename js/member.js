export class Member {
  constructor({
    firstName,
    lastName,
    id = 0,
    age,
    suffix = '',
    mother = '',
    father = '',
    generation = 0,
    children = [],
    siblings = [],
    parentA = -1,
    parentB = -1,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.age = age;
    this.suffix = suffix;
    this.mother = mother;
    this.father = father;
    this.generation = generation;
    this.children = children.map((child) => new Member(child)); // Recursively create Member instances for children
    this.siblings = siblings;
    this.parentA = parentA;
    this.parentB = parentB;
  }

  //families = [];

  getFullName() {
    return `${this.firstName} ${this.lastName} ${this.suffix}`;
  }
}
