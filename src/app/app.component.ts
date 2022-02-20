import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  loggedIn = false;
  password = '';
  inputRows: any[] = [
    {
      givenBoxPerPallet1: null,
      givenPalletPerContainer1: null,
      givenBoxPerPallet2: null,
      givenPalletPerContainer2: null,
      givenBoxPerContainer: null,
      givenSqmtPerBox: null,
      givenPiecesPerBox: null,
      reqPallet1: null,
      reqPallet2: null,
      reqBoxes: null,
      reqSqmt: null,
      reqPieces: null,
      reqContainers: null,
      calcBoxes: null,
      calcContainers: null,
      pallet1: null,
      pallet2: null,
      boxes: null,
      containers: null,
    },
  ];

  columnTotals = {
    containers: 0,
    boxes: 0,
  }

  containersBreakup: any[] = [];

  ngOnInit(): void {
    const inputRows = localStorage.getItem('inputRows');
    if (inputRows) {
      this.inputRows = JSON.parse(inputRows);
      this.calculateRequirementsOfAllRows(false);
    }
  }

  dataChanged(index, type): void {
    switch (type) {
      case 'reqPallet1':
        this.inputRows[index].reqBoxes = null;
        this.inputRows[index].reqSqmt = null;
        this.inputRows[index].reqPieces = null;
        this.inputRows[index].reqContainers = null;
        break;
      case 'reqPallet2':
        this.inputRows[index].reqBoxes = null;
        this.inputRows[index].reqSqmt = null;
        this.inputRows[index].reqPieces = null;
        this.inputRows[index].reqContainers = null;
        break;
      case 'reqBoxes':
        this.inputRows[index].reqPallet1 = null;
        this.inputRows[index].reqPallet2 = null;
        this.inputRows[index].reqSqmt = null;
        this.inputRows[index].reqPieces = null;
        this.inputRows[index].reqContainers = null;
        break;
      case 'reqSqmt':
        this.inputRows[index].reqPallet1 = null;
        this.inputRows[index].reqPallet2 = null;
        this.inputRows[index].reqBoxes = null;
        this.inputRows[index].reqPieces = null;
        this.inputRows[index].reqContainers = null;
        break;
      case 'reqPieces':
        this.inputRows[index].reqPallet1 = null;
        this.inputRows[index].reqPallet2 = null;
        this.inputRows[index].reqSqmt = null;
        this.inputRows[index].reqBoxes = null;
        this.inputRows[index].reqContainers = null;
        break;
      case 'reqContainers':
        this.inputRows[index].reqPallet1 = null;
        this.inputRows[index].reqPallet2 = null;
        this.inputRows[index].reqSqmt = null;
        this.inputRows[index].reqBoxes = null;
        this.inputRows[index].reqPieces = null;
        break;
    }
    this.calculateRequirementsOfOneRow(index, type !== 'pallet1' && type !== 'pallet2');
    this.saveToLocalStorage();
  }

  calculateRequirementsOfOneRow(index, calculatePallets: boolean): void {
    this.calculateBoxesAndContainers(index, calculatePallets);
    this.calculateColumnTotals();
    this.calculateContainerBreakup();
  }

  calculateRequirementsOfAllRows(calculatePallets: boolean): void {
    this.inputRows.forEach((element, index) => {
      this.calculateBoxesAndContainers(index, calculatePallets);
    });

    this.calculateColumnTotals();
    this.calculateContainerBreakup();
  }

  calculateBoxesAndContainers(index, calculatePallets: boolean) {
    let calcBoxes = 0;
    let calcContainers = 0;

    if (this.inputRows[index].reqPallet1 && !this.inputRows[index].reqPallet2) {
      calcContainers = this.inputRows[index].reqPallet1 / this.inputRows[index].givenPalletPerContainer1;
      calcBoxes = this.inputRows[index].reqPallet1 * this.inputRows[index].givenBoxPerPallet1;
    } else if (this.inputRows[index].reqPallet1 && this.inputRows[index].reqPallet2) {
      calcBoxes = (this.inputRows[index].reqPallet1 * this.inputRows[index].givenBoxPerPallet1) + (this.inputRows[index].reqPallet2 * this.inputRows[index].givenBoxPerPallet2);
      calcContainers = calcBoxes / this.inputRows[index].givenBoxPerContainer;
    } else if (this.inputRows[index].reqBoxes) {
      calcBoxes = this.inputRows[index].reqBoxes;
      calcContainers = calcBoxes / this.inputRows[index].givenBoxPerContainer;
    } else if (this.inputRows[index].reqSqmt) {
      calcBoxes = this.inputRows[index].reqSqmt / this.inputRows[index].givenSqmtPerBox;
      calcContainers = calcBoxes / this.inputRows[index].givenBoxPerContainer;
    } else if (this.inputRows[index].reqPieces) {
      calcBoxes = this.inputRows[index].reqPieces / this.inputRows[index].givenPiecesPerBox;
      calcContainers = calcBoxes / this.inputRows[index].givenBoxPerContainer;
    } else if (this.inputRows[index].reqContainers) {
      calcContainers = this.inputRows[index].reqContainers;
      calcBoxes = calcContainers * this.inputRows[index].givenBoxPerContainer;
    }

    this.inputRows[index].calcContainers = parseFloat(calcContainers.toFixed(8));
    this.inputRows[index].calcBoxes = parseFloat(calcBoxes.toFixed(4));

    if (calculatePallets) {
      this.calculateAndAssignPallets(index);
    }

    const finalBoxes = (this.inputRows[index].pallet1 * this.inputRows[index].givenBoxPerPallet1) + (this.inputRows[index].pallet2 * this.inputRows[index].givenBoxPerPallet2);
    const finalContainers = finalBoxes ? finalBoxes / this.inputRows[index].givenBoxPerContainer : 0;
    this.inputRows[index].containers = parseFloat(finalContainers.toFixed(8));
    this.inputRows[index].boxes = parseFloat(finalBoxes.toFixed(4));
  }

  calculateAndAssignPallets(index) {
    let pallet1 = 0;
    let pallet2 = 0;
    if (
      this.inputRows[index].givenBoxPerPallet1 &&
      !this.inputRows[index].givenBoxPerPallet2
    ) {
      let difference = 1000000000;
      const maxCount = Math.ceil(this.inputRows[index].givenPalletPerContainer1 * this.inputRows[index].calcContainers) || 100;
      for (let i = 0; i <= maxCount; i++) {
        const value = this.inputRows[index].givenBoxPerPallet1 * i;
        if (Math.abs(this.inputRows[index].calcBoxes - value) < difference) {
          difference = Math.abs(this.inputRows[index].calcBoxes - value);
          pallet1 = i;
        }
      }
    } else if (
      this.inputRows[index].givenBoxPerPallet1 &&
      this.inputRows[index].givenBoxPerPallet2
    ) {
      let difference = 1000000000;
      const maxCount1 = Math.ceil(this.inputRows[index].givenPalletPerContainer1 * this.inputRows[index].calcContainers) || 100;
      const maxCount2 = Math.ceil(this.inputRows[index].givenPalletPerContainer2 * this.inputRows[index].calcContainers) || 100;
      for (let i = 0; i <= maxCount1; i++) {
        for (let j = 0; j <= maxCount2; j++) {
          const value1 = this.inputRows[index].givenBoxPerPallet1 * i;
          const value2 = this.inputRows[index].givenBoxPerPallet2 * j;
          if (
            Math.abs(this.inputRows[index].calcBoxes - (value1 + value2)) <
            difference
          ) {
            difference = Math.abs(
              this.inputRows[index].calcBoxes - (value1 + value2)
            );
            pallet1 = i;
            pallet2 = j;
          }
        }
      }
    }
    this.inputRows[index].pallet1 = pallet1;
    this.inputRows[index].pallet2 = pallet2;
  }

  saveToLocalStorage(): void {
    localStorage.setItem('inputRows', JSON.stringify(this.inputRows));
  }

  calculateColumnTotals(): void {
    this.columnTotals.containers = parseFloat((this.inputRows.reduce((total, value) => { return total + value.containers || 0; }, 0)).toFixed(4));
    this.columnTotals.boxes = parseFloat((this.inputRows.reduce((total, value) => { return total + value.boxes || 0; }, 0)).toFixed(2));
  }

  onAddClick() {
    this.inputRows.push({
      givenBoxPerPallet1: null,
      givenPalletPerContainer1: null,
      givenBoxPerPallet2: null,
      givenPalletPerContainer2: null,
      givenBoxPerContainer: null,
      givenSqmtPerBox: null,
      givenPiecesPerBox: null,
      reqPallet1: null,
      reqPallet2: null,
      reqBoxes: null,
      reqSqmt: null,
      reqPieces: null,
      reqContainers: null,
      calcBoxes: null,
      calcContainers: null,
      pallet1: null,
      pallet2: null,
      boxes: null,
      containers: null,
    });
    this.calculateRequirementsOfAllRows(true);
  }

  onDeleteClick(index): void {
    if (this.inputRows.length <= 1) {
      this.inputRows[0] = {
        givenBoxPerPallet1: null,
        givenPalletPerContainer1: null,
        givenBoxPerPallet2: null,
        givenPalletPerContainer2: null,
        givenBoxPerContainer: null,
        givenSqmtPerBox: null,
        givenPiecesPerBox: null,
        reqPallet1: null,
        reqPallet2: null,
        reqBoxes: null,
        reqSqmt: null,
        reqPieces: null,
        reqContainers: null,
        calcBoxes: null,
        calcContainers: null,
        pallet1: null,
        pallet2: null,
        boxes: null,
        containers: null,
      }
    } else {
      this.inputRows.splice(index, 1);
    }
    this.calculateRequirementsOfAllRows(true);
  }

  onCopyClick(index): void {
    const dataToCopy = JSON.parse(JSON.stringify(this.inputRows[index]));
    this.inputRows.splice(index, 0, dataToCopy);
    this.calculateRequirementsOfAllRows(true);
  }

  calculateContainerBreakup(): void {
    // prepare empty list
    this.containersBreakup = [];
    for (let index = 0; index < Math.ceil(this.columnTotals.containers); index++) {
      this.containersBreakup.push({ total: 0, breakup: [] });
    }

    // get original container values
    const inputList = JSON.parse(JSON.stringify(this.inputRows.map(x => x.containers)));

    this.containersBreakup.forEach((eachContainer) => {
      for (let index = 0; index < inputList.length; index++) {
        const tileSpace = inputList[index];
        const availableSpace = 1;
        const incomingSpace = Math.min(availableSpace, tileSpace);
        if (availableSpace > 0 && incomingSpace > 0) {
          eachContainer.total += incomingSpace;
          const boxes = parseFloat((this.inputRows[index].givenBoxPerContainer * incomingSpace).toFixed(0));
          eachContainer.breakup.push({
            tileName: 'Tile No. ' + (index + 1),
            rowIndex: index,
            containers: incomingSpace,
            boxes: boxes,
          });
          inputList[index] -= incomingSpace;
          break;
        }
      }
    });

    this.containersBreakup.forEach((eachContainer) => {
      for (let index = 0; index < inputList.length; index++) {
        const tileSpace = inputList[index];
        const availableSpace = 1 - eachContainer.total;
        const incomingSpace = Math.min(availableSpace, tileSpace);
        if (availableSpace > 0 && incomingSpace > 0) {
          eachContainer.total += incomingSpace;
          const boxes = parseFloat((this.inputRows[index].givenBoxPerContainer * incomingSpace).toFixed(0));
          eachContainer.breakup.push({
            tileName: 'Tile No. ' + (index + 1),
            rowIndex: index,
            containers: incomingSpace,
            boxes: boxes,
          });
          inputList[index] -= incomingSpace;
        }
      }
    });
  }

  containerTableDataChanged(group): void {
    group.containers = parseFloat((group.boxes / this.inputRows[group.rowIndex].givenBoxPerContainer).toFixed(8));
  }

  getBreakupTotal(containerRow): string {
    const total = parseFloat((containerRow.breakup.reduce((total, value) => { return total + value.containers || 0; }, 0)).toFixed(4));
    return total > 1 ? `<span>${total}</span>` : `<b>${total}</b>`
  }

  getPalletsCombination(index, boxes): string {
    let pallet1 = 0;
    let pallet2 = 0;
    let calcBoxes = 0;
    const givenBoxPerPallet1 = this.inputRows[index].givenBoxPerPallet1;
    const givenBoxPerPallet2 = this.inputRows[index].givenBoxPerPallet2;
    if (givenBoxPerPallet1 && !givenBoxPerPallet2) {
      let difference = 1000000000;
      for (let i = 0; i <= 100; i++) {
        const value = givenBoxPerPallet1 * i;
        if (Math.abs(boxes - value) < difference) {
          difference = Math.abs(boxes - value);
          pallet1 = i;
        }
      }
      calcBoxes = givenBoxPerPallet1 * pallet1;
      if (calcBoxes !== boxes) {
        return '';
      }
      return `${givenBoxPerPallet1} x ${pallet1}`;
    } else if (givenBoxPerPallet1 && givenBoxPerPallet2) {
      let difference = 1000000000;
      for (let i = 0; i <= 100; i++) {
        for (let j = 0; j <= 100; j++) {
          const value1 = givenBoxPerPallet1 * i;
          const value2 = givenBoxPerPallet2 * j;
          if (Math.abs(boxes - (value1 + value2)) < difference) {
            difference = Math.abs(boxes - (value1 + value2));
            pallet1 = i;
            pallet2 = j;
          }
        }
      }
      calcBoxes = (givenBoxPerPallet1 * pallet1) + (givenBoxPerPallet2 * pallet2);
      if (calcBoxes !== boxes) {
        return '';
      }
      return `${givenBoxPerPallet1} x ${pallet1} + ${givenBoxPerPallet2} x ${pallet2}`;
    }
    return '';
  }

  onLoginClick() {
    if (this.password === '7042896716') {
      this.loggedIn = true;
    }
  }
}
