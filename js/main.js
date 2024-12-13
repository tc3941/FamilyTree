import { Cell } from './cell.js';
import { Member } from './member.js';
let familyMembers;
let familyCells = [];
let verticalGap = Cell.TEXT_MAX_SIZE_Y * 5;
let horizontalGap = Cell.TEXT_MAX_SIZE_X * 0.333;

window.onload = async () => {
  //const { Graphics } = require('pixi.js');
  const graphics = new PIXI.Graphics();
  const app = new PIXI.Application();
  await app.init({ background: '#171717', width: 3840, height: 2160 });
  document.body.appendChild(app.canvas);
  // load the PNG asynchronously
  await PIXI.Assets.load('Media/sample.png');
  let sprite = PIXI.Sprite.from('Media/sample.png');

  // const style = new PIXI.TextStyle({
  //   fill: '#e0e0e0',
  //   fontFamily: 'Georgia',
  //   fontSize: 28,
  //   align: 'center',
  // });
  // let self = new Member({
  //   firstName: 'Theodore',
  //   lastName: 'Conyers Jr',
  //   age: 28,
  // });
  let self;
  let rootFamilyMember;

  //console.log(self);
  //const cellContainer = new PIXI.Container();

  //Start with the first one then find the parent based on the child's id
  //print Start > print their children in the 'next generation' > then print their children etc. until u cant then do the next and continue

  fetch('family.json')
    .then((response) => response.json())
    .then((familyData) => {
      familyMembers = familyData.family.map(
        (memberData) => new Member(memberData)
      );
      //console.log(familyMembers);

      self = familyMembers[0];
      rootFamilyMember = new Cell(self);

      rootFamilyMember.setCanvas(app.canvas);
      rootFamilyMember.draw(app.canvas.width / 2, app.canvas.height / 2);

      let newMember;

      //set parents
      for (let i = 0; i <= familyMembers.length - 1; i++) {
        if (familyMembers[i].children.length != 0) {
          for (let j = 0; j <= familyMembers[i].children.length - 1; j++) {
            //for every child
            let child = familyMembers[i].children[j]; //set child
            //console.log(familyMembers.find((person) => person.id === child.id));
            if (child.id != null) {
              //if child has an id
              let trueSelf = familyMembers.find(
                (person) => person.id === child.id //find the person with the id
              );
              if (trueSelf != null) {
                //console.log(parent);
                trueSelf.parentA == -1
                  ? (trueSelf.parentA = familyMembers[i].id)
                  : (trueSelf.parentB = familyMembers[i].id);
              } else {
                child.parentA == -1
                  ? (child.parentA = familyMembers[i].id)
                  : (child.parentB = familyMembers[i].id);
              }
            }
          }
          //newMember.setCanvas(app.canvas);
          //newMember.draw;
        }
      }

      //Create unique cells for each family member
      setUniqueCells(familyMembers);
      //console.log(verticalGap);
      //Start drawing the family tree from a specific member
      let startingID = 1;
      
      let startingIDCell = familyCells.find((cell) => cell.id === startingID);
      
      let tempParentA = familyCells.find(
        (cell) => cell.id === startingIDCell.member.parentA
      );
      let tempParentB = familyCells.find(
        (cell) => cell.id === startingIDCell.member.parentB
      );
      
      getSiblings(startingID);
      //#region Get siblings
/*
      let siblingsList = [];

      if (tempParentA) {
        for (const element of tempParentA.member.children) {
          siblingsList.push(element.id);
        }
      }
      if (tempParentB) {
        for (const element of tempParentB.member.children) {
          siblingsList.push(element.id);
        }
      }
      //Get starting ID's siblings to make family cells
      //Check each parent of the startingID and get their children

      //Set siblings by id first and prevent duplicates replace IDs with member object instead

      siblingsList = [...new Set(siblingsList)];
      let siblingsMemList = [];
      for (const sibling of siblingsList) {
        siblingsMemList.push(
          familyCells.find(
            (person) => person.id === sibling //find the person with the id
          )
        );
      }
      console.log('siblingsList');
      console.log(siblingsMemList);
      */
      //#endregion
      
      //region Get Parents Siblings


      //#endregion

      let tempChild;
      if (tempParentA) {
        tempChild = tempParentA.member.children.find(
          (cell) => cell.id === startingID
        );
        const index = tempParentA.member.children.indexOf(tempChild);
        const x = tempParentA.member.children.splice(index, 1);
      }
      if (tempParentB) {
        tempChild = tempParentB.member.children.find(
          (cell) => cell.id === startingID
        );
        const index = tempParentB.member.children.indexOf(tempChild);
        const x = tempParentB.member.children.splice(index, 1);
      }

      startDraw(app, startingID, app.canvas.width / 2, app.canvas.height / 2);
      //print self(first one in center) their children their children etc. then parentA (left) then their children
      //problem cases: one parent, children from first parent should be next to each other
      // if not null (-1), remember what cell u comefrom
      /*
      for (let i = 0; i <= familyMembers.length - 1; i++) {
        let currentMember = familyMembers[i];
        let currentCell = new Cell(currentMember);
        currentCell.x = currentX;
        currentCell.y = currentY;
        if (familyMembers[i].children.length >0) {
          
        }
      }*/

      console.log('familyMembers');
      console.log(familyMembers);
      console.log('familyCells');
      console.log(familyCells);

      tempParentA.member.children.push(tempChild);
      tempParentB.member.children.push(tempChild);
      //app.stage.addChild(rootFamilyMember.cellContainer);
    })
    .catch((error) => console.error('Error loading family data:', error));

  //const text = new PIXI.Text({ text: rootFamilyMember.getName(), style });
  /*
  function getStringWidth(input, font) {
    // Create a hidden span element
    const span = document.createElement('span');
    span.style.font = font; // Set the font if needed
    span.style.visibility = 'hidden';
    span.textContent = input;

    // Append the span to the document body
    document.body.appendChild(span);

    // Get the width of the span
    const width = span.offsetWidth;

    // Remove the span from the document body
    document.body.removeChild(span);

    return width;
  }*/
  /*
  let cellTopLine = new PIXI.Graphics();
  cellTopLine.moveTo(
    app.canvas.width / 2 +
      getStringWidth(
        'Theodore Conyers Jr',
        style.fontSize * 0.1 + 'px ' + style.fontFamily
      ),
    app.canvas.height / 2 + style.fontSize + 2
  );
  cellTopLine.lineTo(
    app.canvas.width / 2 +
      getStringWidth(
        'Theodore Conyers Jr',
        style.fontSize * 0.9 + 'px ' + style.fontFamily
      ),
    app.canvas.height / 2 + style.fontSize + 2
  );
  cellTopLine.stroke({ width: 1, color: 0xffffff });

  cellContainer.addChild(cellTopLine);*/
  //text.x = app.canvas.width / 2;
  //text.y = app.canvas.height / 2;

  let borderTop = new PIXI.Graphics();
  let borderBottom = new PIXI.Graphics();
  let borderLeft = new PIXI.Graphics();
  let borderRight = new PIXI.Graphics();

  app.stage.addChild(borderTop);
  app.stage.addChild(borderBottom);
  app.stage.addChild(borderLeft);
  app.stage.addChild(borderRight);

  //borderTop.lineStyle(20, 0xffffff, 1); // Line thickness: 5px, color: white, alpha: 1
  const BORDER_MARGIN = {
    x: app.screen.height / 100,
    y: app.screen.height / 100,
  };
  // Draw a line at the top of the screen
  borderTop.moveTo(BORDER_MARGIN.x, BORDER_MARGIN.y); // Start from the top-left corner
  borderTop.lineTo(app.screen.width - BORDER_MARGIN.x, BORDER_MARGIN.y); // Draw to the top-right corner
  borderTop.stroke({ width: 1, color: 0xffffff });

  borderBottom.moveTo(
    app.screen.width - BORDER_MARGIN.x,
    app.screen.height - BORDER_MARGIN.y
  ); // Start from the top-left corner
  borderBottom.lineTo(BORDER_MARGIN.x, app.screen.height - BORDER_MARGIN.y); // Draw to the top-right corner
  borderBottom.stroke({ width: 1, color: 0xffffff });

  borderLeft.moveTo(BORDER_MARGIN.x, BORDER_MARGIN.y); // Start from the top-left corner
  borderLeft.lineTo(BORDER_MARGIN.x, app.screen.height - BORDER_MARGIN.y); // Draw to the top-right corner
  borderLeft.stroke({ width: 1, color: 0xffffff });

  borderRight.moveTo(app.screen.width - BORDER_MARGIN.x, BORDER_MARGIN.y); // Start from the top-left corner
  borderRight.lineTo(
    app.screen.width - BORDER_MARGIN.x,
    app.screen.height - BORDER_MARGIN.y
  ); // Draw to the top-right corner
  borderRight.stroke({ width: 1, color: 0xffffff });

  // Add the borderTop to the stage
  //app.stage.addChild(sprite);

  // Add a variable to count up the seconds our demo has been running
  let elapsed = 0.0;
  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add((ticker) => {
    // Add the time to our total elapsed time
    elapsed += ticker.deltaTime;
    // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    // by 50 to slow the animation down a bit...
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
  });

  const scrollUpArrow = document.getElementById('top');
  const scrollDownArrow = document.getElementById('bottom');
  const scrollLeftArrow = document.getElementById('left');
  const scrollRightArrow = document.getElementById('right');

  scrollUpArrow.addEventListener('click', function () {
    window.scrollBy({
      top: -window.innerHeight / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });
  scrollDownArrow.addEventListener('click', function () {
    window.scrollBy({
      top: window.innerHeight / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });
  scrollLeftArrow.addEventListener('click', function () {
    window.scrollBy({
      left: -window.innerWidth / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });
  scrollRightArrow.addEventListener('click', function () {
    window.scrollBy({
      left: window.innerWidth / 10, // Scroll up by one viewport height
      behavior: 'smooth', // Smooth scrolling
    });
  });

  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  const scrollableContent = document.querySelector('.scrollable-content');

  scrollableContent.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    scrollLeft = window.scrollX;
    scrollTop = window.scrollY;
    scrollableContent.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    scrollableContent.style.cursor = 'default';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const xDiff = e.clientX - startX;
    const yDiff = e.clientY - startY;

    window.scrollTo(scrollLeft - xDiff, scrollTop - yDiff);
  });
};

//First in json first one we start with
function startDraw(app_, id_, x, y, parentCell = '') {
  let cell_ = familyCells.find((cell) => cell.member.id === id_);
  console.log(
    cell_.member.firstName +
      ' ' +
      cell_.member.lastName +
      ' ' +
      cell_.member.suffix +
      ': positionSet? ' +
      cell_.positionSet +
      ', x: ' +
      x +
      ', ' +
      'y:' +
      y
  );
  if (!cell_.positionSet) {
    cell_.setCanvas(app_.canvas);
    cell_.draw(x, y);
    cell_.positionSet = true;
    // console.log('drawing');
    // console.log(cell_);
    // console.log('stage: ');
    // console.log(app_.stage);
    app_.stage.addChild(cell_.cellContainer);
    //cell > child >child if possible
    if (cell_.member.children.length > 0) {
      //might need to make an array that consists of all the children except the one you came from
      for (let i = 0; i <= cell_.member.children.length - 1; i++) {
        const drawn =
          familyCells.find(
            (cell) => cell.member.id === cell_.member.children[i].id
          ).positionSet == true;
        if (!drawn) {
          if (parentCell.id === cell_.member.children[i].parentB) {
            //if parentB's kid print to the right else left
            startDraw(
              app_,
              cell_.member.children[i].id,
              x -
                Cell.TEXT_MAX_SIZE_X / 2 +
                i * (horizontalGap + Cell.TEXT_MAX_SIZE_X),
              y + verticalGap,
              cell_
            );
          } else {
            startDraw(
              app_,
              cell_.member.children[i].id,
              x +
                horizontalGap * 0.5 +
                Cell.TEXT_MAX_SIZE_X / 2 -
                (cell_.member.children.length - i) *
                  (horizontalGap + Cell.TEXT_MAX_SIZE_X),
              y + verticalGap,
              cell_
            );
          }
        }
      }
    }
    //find parents
    const parentA = familyCells.find(
      (cell) => cell.id === cell_.member.parentA
    );
    const parentB = familyCells.find(
      (cell) => cell.id === cell_.member.parentB
    );
    if (cell_.member.parentA !== -1 && parentA != null) {
      console.log(
        'ParentA: ' + (cell_.member.parentA !== -1) + ' and ' + parentA
      );

      //check that cells member and see if parent exists
      //if parentA (should be mom) print top left else top right
      startDraw(
        app_,
        cell_.member.parentA,
        x +
          Cell.TEXT_MAX_SIZE_X / 2 -
          (horizontalGap / 2 + Cell.TEXT_MAX_SIZE_X),
        y - verticalGap
      );
    }
    if (cell_.member.parentB !== -1 && parentB != null) {
      console.log(
        'ParentB: ' + (cell_.member.parentB !== -1) + ' and ' + parentB
      );
      startDraw(
        app_,
        cell_.member.parentB,
        x -
          Cell.TEXT_MAX_SIZE_X / 2 +
          (horizontalGap / 2 + Cell.TEXT_MAX_SIZE_X),
        y - verticalGap
      );
    }
  }
}

// Creates unique Cell objects for each Member
function setUniqueCells(familyMembers_) {
  //console.log('Ding: ' + familyMembers_[0].firstName);
  for (let i = 0; i <= familyMembers_.length - 1; i++) {
    //go thru all of the members
    let currentMember = familyMembers_[i];
    let trueMember = familyMembers.find(
      (person) => person.id === currentMember.id //find the person with the id
    );
    if (trueMember == null) {
      //if that person doesnt have a 'true self'
      trueMember = currentMember;
    }
    if (!familyCells.find((cell) => cell.member.id === trueMember.id)) {
      //throw the person into the cell array and set positon
      let currentCell = new Cell(trueMember);
      familyCells.push(currentCell);
    }
    if (familyMembers_[i].children.length > 0) {
      setUniqueCells(familyMembers_[i].children);
    }
  }
}

function getSiblings(id_){

  let startingIDCell = familyCells.find((cell) => cell.id === id_);

      let tempParentA = familyCells.find(
        (cell) => cell.id === startingIDCell.member.parentA
      );
      let tempParentB = familyCells.find(
        (cell) => cell.id === startingIDCell.member.parentB
      );

  let siblingsList = [];

  if (tempParentA) {
    for (const element of tempParentA.member.children) {
      siblingsList.push(element.id);
    }
  }
  if (tempParentB) {
    for (const element of tempParentB.member.children) {
      siblingsList.push(element.id);
    }
  }
  //Get starting ID's siblings to make family cells
  //Check each parent of the startingID and get their children

  //Set siblings by id first and prevent duplicates replace IDs with member object instead

  siblingsList = [...new Set(siblingsList)];
  let siblingsMemList = [];
  for (const sibling of siblingsList) {
    siblingsMemList.push(
      familyCells.find(
        (person) => person.id === sibling //find the person with the id
      )
    );
  }
  console.log('siblingsList');
  console.log(siblingsMemList);
  return siblingsMemList;
}
