import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  clientRequirement = 'sqmt';
  dataRows: any[] = [{
    "boxPerPallet1": null,
    "boxPerPallet2": null,
    "sqmtPerBox": null,
    "weightPerBox": null,
    "piecesPerBox": null,
    "boxPerContainer": null,
    "sqmt": null,
    "pieces": null,
    "boxes": null,
    "pallets1": null,
    "pallets2": null,
    "calcBoxes": null,
    "calcSqmt": null,
    "calcPercentage": null,
    "calcWeight": null,
    "calcContainers": null,
  }];
  dataTotal = {
    totalSqmt: 0,
    totalPieces: 0,
    totalBoxes: 0,
    totalPallets1: 0,
    totalPallets2: 0,
    totalCalcBoxes: 0,
    totalCalcSqmt: 0,
    totalCalcPercentage: 0,
    totalCalcWeight: 0,
    totalCalcContainers: 0,
  }
  monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  ngOnInit(): void {
    const savedRows = localStorage.getItem('rows');
    const savedTotal = localStorage.getItem('total');
    const savedRequirement = localStorage.getItem('requirement');
    if (savedRows) {
      this.dataRows = JSON.parse(savedRows);
    }
    if (savedTotal) {
      this.dataTotal = JSON.parse(savedTotal);
    }
    this.clientRequirement = savedRequirement || 'sqmt';
  }

  onAddClick() {
    this.dataRows.push({
      "boxPerPallet1": null,
      "boxPerPallet2": null,
      "sqmtPerBox": null,
      "weightPerBox": null,
      "piecesPerBox": null,
      "boxPerContainer": null,
      "boxes": null,
      "pallets1": null,
      "pallets2": null,
      "sqmt": null,
      "pieces": null,
      "calcBoxes": null,
      "calcSqmt": null,
      "calcPercentage": null,
      "calcWeight": null,
      "calcContainers": null,
    })
    this.calculateAndAssignTotals();
  }

  onDeleteClick(index) {
    if (this.dataRows.length <= 1) {
      this.dataRows[0] = {
        "boxPerPallet1": null,
        "boxPerPallet2": null,
        "sqmtPerBox": null,
        "weightPerBox": null,
        "piecesPerBox": null,
        "boxPerContainer": null,
        "sqmt": null,
        "pieces": null,
        "boxes": null,
        "pallets1": null,
        "pallets2": null,
        "calcBoxes": null,
        "calcSqmt": null,
        "calcPercentage": null,
        "calcWeight": null,
        "calcContainers": null,
      }
    } else {
      this.dataRows.splice(index, 1);
    }
    this.calculateAndAssignTotals();
  }

  dataChanged(index, type, value) {
    switch (type) {
      case "boxPerPallet1":
      case "boxPerPallet2":
      case "sqmtPerBox":
      case "weightPerBox":
      case "piecesPerBox":
      case "boxPerContainer":
        switch (this.clientRequirement) {
          case 'sqmt':
            this.dataRows[index].boxes = Number((this.dataRows[index].sqmt / this.dataRows[index].sqmtPerBox).toFixed(0));
            this.dataRows[index].pieces = Number((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
            this.calculateAndAssignPallets(index);
            break;
          case 'pieces':
            this.dataRows[index].boxes = parseInt((this.dataRows[index].pieces / this.dataRows[index].piecesPerBox).toFixed(0));
            this.dataRows[index].sqmt = parseInt((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
            this.calculateAndAssignPallets(index);
            break;
          case 'boxes':
            this.dataRows[index].pieces = parseInt((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
            this.dataRows[index].sqmt = parseInt((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
            this.calculateAndAssignPallets(index);
            break;
        }
        break;
      case "sqmt":
        this.dataRows[index].boxes = Number((this.dataRows[index].sqmt / this.dataRows[index].sqmtPerBox).toFixed(0));
        this.dataRows[index].pieces = Number((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
        // if (!this.dataRows[index].boxPerPallet2) {
        //   this.dataRows[index].pallets1 = Math.ceil((this.dataRows[index].boxes / this.dataRows[index].boxPerPallet1));
        //   this.dataRows[index].pallets2 = 0;
        // } else {
        //   const halfBoxes = this.dataRows[index].boxes / 2;
        //   this.dataRows[index].pallets1 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet1));
        //   this.dataRows[index].pallets2 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet2));
        // }
        this.calculateAndAssignPallets(index);
        break;
      case "pieces":
        this.dataRows[index].boxes = parseInt((this.dataRows[index].pieces / this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = parseInt((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
        // if (!this.dataRows[index].boxPerPallet2) {
        //   this.dataRows[index].pallets1 = Math.ceil((this.dataRows[index].boxes / this.dataRows[index].boxPerPallet1));
        //   this.dataRows[index].pallets2 = 0;
        // } else {
        //   const halfBoxes = this.dataRows[index].boxes / 2;
        //   this.dataRows[index].pallets1 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet1));
        //   this.dataRows[index].pallets2 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet2));
        // }
        this.calculateAndAssignPallets(index);
        break;
      case "boxes":
        this.dataRows[index].pieces = parseInt((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = parseInt((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
        // if (!this.dataRows[index].boxPerPallet2) {
        //   this.dataRows[index].pallets1 = Math.ceil((this.dataRows[index].boxes / this.dataRows[index].boxPerPallet1));
        //   this.dataRows[index].pallets2 = 0;
        // } else {
        //   const halfBoxes = this.dataRows[index].boxes / 2;
        //   this.dataRows[index].pallets1 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet1));
        //   this.dataRows[index].pallets2 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet2));
        // }
        this.calculateAndAssignPallets(index);
        break;
      case "pallets1":
        this.dataRows[index].boxes = parseInt((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0)) + parseInt((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
        this.dataRows[index].pieces = parseInt((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = parseInt((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
        if (!this.dataRows[index].boxPerPallet2) {
          this.dataRows[index].pallets2 = 0;
        } else {
          const halfBoxes = this.dataRows[index].boxes - parseInt((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0));
          this.dataRows[index].pallets2 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet2));
        }
        break;
      case "pallets2":
        this.dataRows[index].boxes = parseInt((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0)) + parseInt((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
        this.dataRows[index].pieces = parseInt((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = parseInt((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
        const halfBoxes = this.dataRows[index].boxes - parseInt((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
        this.dataRows[index].pallets1 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet1));
        break;
    }

    this.dataRows[index].calcBoxes = parseInt((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0)) + parseInt((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
    this.dataRows[index].calcSqmt = parseFloat((this.dataRows[index].calcBoxes * this.dataRows[index].sqmtPerBox).toFixed(2));
    this.dataRows[index].calcPercentage = parseInt((this.dataRows[index].calcBoxes * 100 / this.dataRows[index].boxPerContainer).toFixed(0));
    this.dataRows[index].calcWeight = parseInt((this.dataRows[index].calcBoxes * this.dataRows[index].weightPerBox).toFixed(0))
    this.dataRows[index].calcContainers = parseFloat((this.dataRows[index].calcBoxes / this.dataRows[index].boxPerContainer).toFixed(2));

    this.calculateAndAssignTotals();
  }

  calculateAndAssignPallets(index) {
    let pallet1 = 0;
    let pallet2 = 0;
    if (this.dataRows[index].boxPerPallet1 && !this.dataRows[index].boxPerPallet2) {
      let difference = 1000000000;
      for (let i = 0; i <= 100; i++) {
        const value = this.dataRows[index].boxPerPallet1 * i;
        if (Math.abs(this.dataRows[index].boxes - value) < difference) {
          difference = Math.abs(this.dataRows[index].boxes - value);
          pallet1 = i;
        }
      }
    } else if (this.dataRows[index].boxPerPallet1 && this.dataRows[index].boxPerPallet2) {
      let difference = 1000000000;
      for (let i = 0; i <= 100; i++) {
        for (let j = 0; j <= 100; j++) {
          const value1 = this.dataRows[index].boxPerPallet1 * i;
          const value2 = this.dataRows[index].boxPerPallet2 * j;
          if (Math.abs(this.dataRows[index].boxes - (value1 + value2)) < difference) {
            difference = Math.abs(this.dataRows[index].boxes - (value1 + value2));
            pallet1 = i;
            pallet2 = j;
          }
        }
      }
    }
    this.dataRows[index].pallets1 = pallet1;
    this.dataRows[index].pallets2 = pallet2;
  }

  calculateAndAssignTotals() {
    this.dataTotal.totalSqmt = parseFloat(this.dataRows.reduce((total, value) => { return total + value.sqmt || 0; }, 0).toFixed(2));
    this.dataTotal.totalPieces = parseInt(this.dataRows.reduce((total, value) => { return total + value.pieces || 0; }, 0).toFixed(0));
    this.dataTotal.totalBoxes = parseInt(this.dataRows.reduce((total, value) => { return total + value.boxes || 0; }, 0).toFixed(0));
    this.dataTotal.totalPallets1 = parseInt(this.dataRows.reduce((total, value) => { return total + value.pallets1 || 0; }, 0).toFixed(0));
    this.dataTotal.totalPallets2 = parseInt(this.dataRows.reduce((total, value) => { return total + value.pallets2 || 0; }, 0).toFixed(0));
    this.dataTotal.totalCalcBoxes = parseInt(this.dataRows.reduce((total, value) => { return total + value.calcBoxes || 0; }, 0).toFixed(0));
    this.dataTotal.totalCalcSqmt = parseFloat(this.dataRows.reduce((total, value) => { return total + value.calcSqmt || 0; }, 0).toFixed(2));
    this.dataTotal.totalCalcPercentage = parseInt(this.dataRows.reduce((total, value) => { return total + value.calcPercentage || 0; }, 0).toFixed(0));
    this.dataTotal.totalCalcWeight = parseInt(this.dataRows.reduce((total, value) => { return total + value.calcWeight || 0; }, 0).toFixed(0));
    this.dataTotal.totalCalcContainers = parseFloat(this.dataRows.reduce((total, value) => { return total + value.calcContainers || 0; }, 0).toFixed(2));

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('rows', JSON.stringify(this.dataRows));
    localStorage.setItem('total', JSON.stringify(this.dataTotal));
  }

  onDownloadClick() {
    this.downloadFile(this.dataRows);
  }

  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift([
      "Box/Pallet (Type 1)",
      "Box/Pallet (Type 2)",
      "Sqmt/Box",
      "Weight/Box (Kg)",
      "Pieces/Box",
      "Box/Container",
      "Required Sqmt",
      "Required Pieces",
      "Required Boxes",
      "Pallets (Type 1)",
      "Pallets (Type 2)",
      "Calculated Boxes",
      "Calculated Sqmt",
      "Percentage (%)",
      "Weight (Kg)",
      "Containers",
    ].join(','));
    let csvArray = csv.join('\r\n');
    const blob = new Blob([csvArray], { type: 'text/csv' })
    const date = new Date();
    saveAs(blob, "PI_Sheet_" + date.getDate() + "_" + this.monthArr[date.getMonth()] + ".csv");
  }

  changeType(value) {
    this.clientRequirement = value;
    localStorage.setItem('requirement', this.clientRequirement);
  }

}
