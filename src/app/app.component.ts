import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  // input = [
  //   {
  //     boxPerPallet1: 44,
  //     boxPerPallet2: 0,
  //     targetSqmt: 300,
  //     targetPieces: null,
  //     boxPerContainer: 968,
  //     boxWeightKg: 28,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 44,
  //     boxPerPallet2: 0,
  //     targetSqmt: 200,
  //     targetPieces: null,
  //     boxPerContainer: 968,
  //     boxWeightKg: 28,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 44,
  //     boxPerPallet2: 0,
  //     targetSqmt: 100,
  //     targetPieces: null,
  //     boxPerContainer: 968,
  //     boxWeightKg: 28,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 44,
  //     boxPerPallet2: 0,
  //     targetSqmt: 100,
  //     targetPieces: null,
  //     boxPerContainer: 968,
  //     boxWeightKg: 28,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 44,
  //     boxPerPallet2: 0,
  //     targetSqmt: 100,
  //     targetPieces: null,
  //     boxPerContainer: 968,
  //     boxWeightKg: 28,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 36,
  //     boxPerPallet2: 68,
  //     targetSqmt: 100,
  //     targetPieces: null,
  //     boxPerContainer: 932,
  //     boxWeightKg: 29,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 36,
  //     boxPerPallet2: 68,
  //     targetSqmt: 200,
  //     targetPieces: null,
  //     boxPerContainer: 932,
  //     boxWeightKg: 29,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 36,
  //     boxPerPallet2: 68,
  //     targetSqmt: 100,
  //     targetPieces: null,
  //     boxPerContainer: 932,
  //     boxWeightKg: 29,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 36,
  //     boxPerPallet2: 68,
  //     targetSqmt: 50,
  //     targetPieces: null,
  //     boxPerContainer: 932,
  //     boxWeightKg: 29,
  //     maxWeight: 27000,
  //     sqmPerBox: 1.44,
  //     piecesPerBox: null,
  //   },
  //   {
  //     boxPerPallet1: 61,
  //     boxPerPallet2: 0,
  //     targetSqmt: 200,
  //     targetPieces: null,
  //     boxPerContainer: 1342,
  //     boxWeightKg: 18,
  //     maxWeight: 27000,
  //     sqmPerBox: 0.941,
  //     piecesPerBox: null,
  //   },
  // ];

  // output: any[] = [];
  // outputTotals = {
  //   totalBoxes: 0,
  //   totalPercentage: 0,
  //   totalWeight: 0,
  // };


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

  ngOnInit(): void {
    const savedRows = localStorage.getItem('rows');
    const savedTotal = localStorage.getItem('total');
    if (savedRows) {
      this.dataRows = JSON.parse(savedRows);
    }
    if (savedTotal) {
      this.dataTotal = JSON.parse(savedTotal);
    }
    // this.output = this.calculateClosestPallets();
    // this.output = this.calculateMinPallets();
    // this.output = this.calculateMaxPallets();

    // this.outputTotals = this.calculateTotals();
  }

  // calculateClosestPallets(): any[] {
  //   const output: any[] = [];
  //   this.input.forEach((element) => {
  //     const result = {} as any;
  //     result.boxPerPallet1 = element.boxPerPallet1;
  //     result.boxPerPallet2 = element.boxPerPallet2;

  //     result.targetSqmt = element.targetSqmt;
  //     result.targetPieces = element.targetPieces;
  //     result.targetBoxes = Number(
  //       (element.targetSqmt
  //         ? element.targetSqmt / element.sqmPerBox
  //         : element.targetPieces && element.piecesPerBox
  //           ? element.targetPieces / element.piecesPerBox
  //           : 0
  //       ).toFixed(2)
  //     );
  //     result.boxPerContainer = element.boxPerContainer;
  //     result.boxWeightKg = element.boxWeightKg;
  //     result.maxWeight = element.maxWeight;
  //     result.sqmPerBox = element.sqmPerBox;
  //     result.piecesPerBox = element.piecesPerBox;

  //     //
  //     // CALCULATION
  //     //
  //     let palletPerContainer1 = 0;
  //     let palletPerContainer2 = 0;
  //     if (element.boxPerPallet1 && !element.boxPerPallet2) {
  //       let difference = 1000000000;
  //       for (let i = 0; i <= 50; i++) {
  //         const value = element.boxPerPallet1 * i;
  //         if (Math.abs(result.targetBoxes - value) < difference) {
  //           difference = Math.abs(result.targetBoxes - value);
  //           palletPerContainer1 = i;
  //         }
  //       }
  //     } else if (element.boxPerPallet1 && element.boxPerPallet2) {
  //       let difference = 1000000000;
  //       for (let i = 0; i <= 50; i++) {
  //         for (let j = 0; j <= 50; j++) {
  //           const value1 = element.boxPerPallet1 * i;
  //           const value2 = element.boxPerPallet2 * j;
  //           if (Math.abs(result.targetBoxes - (value1 + value2)) < difference) {
  //             difference = Math.abs(result.targetBoxes - (value1 + value2));
  //             palletPerContainer1 = i;
  //             palletPerContainer2 = j;
  //           }
  //         }
  //       }
  //     }
  //     result.palletPerContainer1 = palletPerContainer1;
  //     result.palletPerContainer2 = palletPerContainer2;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedBoxes =
  //       (element.boxPerPallet1 || 0) * result.palletPerContainer1 +
  //       (element.boxPerPallet2 || 0) * result.palletPerContainer2;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedPercentage = Number(
  //       ((result.calculatedBoxes * 100) / element.boxPerContainer).toFixed(2)
  //     );

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedWeight = result.calculatedBoxes * element.boxWeightKg;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedSqmt = Number(
  //       (result.calculatedBoxes * element.sqmPerBox).toFixed(2)
  //     );

  //     output.push(result);
  //   });
  //   return output;
  // }

  // calculateMinPallets(): any[] {
  //   const output: any[] = [];
  //   this.input.forEach((element) => {
  //     const result = {} as any;
  //     result.boxPerPallet1 = element.boxPerPallet1;
  //     result.boxPerPallet2 = element.boxPerPallet2;

  //     result.targetSqmt = element.targetSqmt;
  //     result.targetPieces = element.targetPieces;
  //     result.targetBoxes = Number(
  //       (element.targetSqmt
  //         ? element.targetSqmt / element.sqmPerBox
  //         : element.targetPieces && element.piecesPerBox
  //           ? element.targetPieces / element.piecesPerBox
  //           : 0
  //       ).toFixed(2)
  //     );
  //     result.boxPerContainer = element.boxPerContainer;
  //     result.boxWeightKg = element.boxWeightKg;
  //     result.maxWeight = element.maxWeight;
  //     result.sqmPerBox = element.sqmPerBox;
  //     result.piecesPerBox = element.piecesPerBox;

  //     //
  //     // CALCULATION
  //     //
  //     let palletPerContainer1 = 0;
  //     let palletPerContainer2 = 0;
  //     if (element.boxPerPallet1 && !element.boxPerPallet2) {
  //       let difference = 1000000000;
  //       for (let i = 0; i <= 50; i++) {
  //         const value = element.boxPerPallet1 * i;
  //         const diff = result.targetBoxes - value;
  //         if (diff >= 0 && diff < difference) {
  //           difference = diff;
  //           palletPerContainer1 = i;
  //         }
  //       }
  //     } else if (element.boxPerPallet1 && element.boxPerPallet2) {
  //       let difference = 1000000000;
  //       for (let i = 0; i <= 50; i++) {
  //         for (let j = 0; j <= 50; j++) {
  //           const value1 = element.boxPerPallet1 * i;
  //           const value2 = element.boxPerPallet2 * j;
  //           const diff = result.targetBoxes - (value1 + value2);
  //           if (diff >= 0 && diff < difference) {
  //             difference = diff;
  //             palletPerContainer1 = i;
  //             palletPerContainer2 = j;
  //           }
  //         }
  //       }
  //     }
  //     result.palletPerContainer1 = palletPerContainer1;
  //     result.palletPerContainer2 = palletPerContainer2;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedBoxes =
  //       (element.boxPerPallet1 || 0) * result.palletPerContainer1 +
  //       (element.boxPerPallet2 || 0) * result.palletPerContainer2;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedPercentage = Number(
  //       ((result.calculatedBoxes * 100) / element.boxPerContainer).toFixed(2)
  //     );

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedWeight = result.calculatedBoxes * element.boxWeightKg;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedSqmt = Number(
  //       (result.calculatedBoxes * element.sqmPerBox).toFixed(2)
  //     );

  //     output.push(result);
  //   });
  //   return output;
  // }

  // calculateMaxPallets(): any[] {
  //   const output: any[] = [];
  //   this.input.forEach((element) => {
  //     const result = {} as any;
  //     result.boxPerPallet1 = element.boxPerPallet1;
  //     result.boxPerPallet2 = element.boxPerPallet2;

  //     result.targetSqmt = element.targetSqmt;
  //     result.targetPieces = element.targetPieces;
  //     result.targetBoxes = Number(
  //       (element.targetSqmt
  //         ? element.targetSqmt / element.sqmPerBox
  //         : element.targetPieces && element.piecesPerBox
  //           ? element.targetPieces / element.piecesPerBox
  //           : 0
  //       ).toFixed(2)
  //     );
  //     result.boxPerContainer = element.boxPerContainer;
  //     result.boxWeightKg = element.boxWeightKg;
  //     result.maxWeight = element.maxWeight;
  //     result.sqmPerBox = element.sqmPerBox;
  //     result.piecesPerBox = element.piecesPerBox;

  //     //
  //     // CALCULATION
  //     //
  //     let palletPerContainer1 = 0;
  //     let palletPerContainer2 = 0;
  //     if (element.boxPerPallet1 && !element.boxPerPallet2) {
  //       let difference = 1000000000;
  //       for (let i = 0; i <= 50; i++) {
  //         const value = element.boxPerPallet1 * i;
  //         const diff = value - result.targetBoxes;
  //         if (diff >= 0 && diff < difference) {
  //           difference = diff;
  //           palletPerContainer1 = i;
  //         }
  //       }
  //     } else if (element.boxPerPallet1 && element.boxPerPallet2) {
  //       let difference = 1000000000;
  //       for (let i = 0; i <= 50; i++) {
  //         for (let j = 0; j <= 50; j++) {
  //           const value1 = element.boxPerPallet1 * i;
  //           const value2 = element.boxPerPallet2 * j;
  //           const diff = value1 + value2 - result.targetBoxes;
  //           if (diff >= 0 && diff < difference) {
  //             difference = diff;
  //             palletPerContainer1 = i;
  //             palletPerContainer2 = j;
  //           }
  //         }
  //       }
  //     }
  //     result.palletPerContainer1 = palletPerContainer1;
  //     result.palletPerContainer2 = palletPerContainer2;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedBoxes =
  //       (element.boxPerPallet1 || 0) * result.palletPerContainer1 +
  //       (element.boxPerPallet2 || 0) * result.palletPerContainer2;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedPercentage = Number(
  //       ((result.calculatedBoxes * 100) / element.boxPerContainer).toFixed(2)
  //     );

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedWeight = result.calculatedBoxes * element.boxWeightKg;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedSqmt = Number(
  //       (result.calculatedBoxes * element.sqmPerBox).toFixed(2)
  //     );

  //     output.push(result);
  //   });
  //   return output;
  // }

  // calculateGivenPallets(): any[] {
  //   const output: any[] = [];
  //   this.output.forEach((element) => {
  //     const result = {} as any;
  //     result.boxPerPallet1 = element.boxPerPallet1;
  //     result.boxPerPallet2 = element.boxPerPallet2;
  //     result.palletPerContainer1 = element.palletPerContainer1;
  //     result.palletPerContainer2 = element.palletPerContainer2;

  //     result.targetSqmt = element.targetSqmt;
  //     result.targetPieces = element.targetPieces;
  //     result.targetBoxes = Number(
  //       (element.targetSqmt
  //         ? element.targetSqmt / element.sqmPerBox
  //         : element.targetPieces && element.piecesPerBox
  //           ? element.targetPieces / element.piecesPerBox
  //           : 0
  //       ).toFixed(2)
  //     );
  //     result.boxPerContainer = element.boxPerContainer;
  //     result.boxWeightKg = element.boxWeightKg;
  //     result.maxWeight = element.maxWeight;
  //     result.sqmPerBox = element.sqmPerBox;
  //     result.piecesPerBox = element.piecesPerBox;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedBoxes =
  //       (element.boxPerPallet1 || 0) * result.palletPerContainer1 +
  //       (element.boxPerPallet2 || 0) * result.palletPerContainer2;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedPercentage = Number(
  //       ((result.calculatedBoxes * 100) / element.boxPerContainer).toFixed(2)
  //     );

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedWeight = result.calculatedBoxes * element.boxWeightKg;

  //     //
  //     // CALCULATION
  //     //
  //     result.calculatedSqmt = Number(
  //       (result.calculatedBoxes * element.sqmPerBox).toFixed(2)
  //     );

  //     output.push(result);
  //   });
  //   return output;
  // }

  // calculateTotals() {
  //   const outputTotals = {} as any;
  //   outputTotals.totalPercentage = this.output.reduce((total, value) => {
  //     return total + Number(value.calculatedPercentage);
  //   }, 0);

  //   outputTotals.totalWeight = Number(
  //     (
  //       this.output.reduce((total, value) => {
  //         return total + Number(value.calculatedWeight);
  //       }, 0) / 1000
  //     ).toFixed(4)
  //   );

  //   outputTotals.totalBoxes = this.output.reduce((total, value) => {
  //     return total + Number(value.calculatedBoxes);
  //   }, 0);

  //   return outputTotals;
  // }

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
      case "boxPerPallet1": break;
      case "boxPerPallet2": break;
      case "sqmtPerBox": break;
      case "weightPerBox": break;
      case "piecesPerBox": break;
      case "boxPerContainer": break;
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
        this.dataRows[index].boxes = Number((this.dataRows[index].pieces / this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = Number((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
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
        this.dataRows[index].pieces = Number((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = Number((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
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
        this.dataRows[index].boxes = Number((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0)) + Number((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
        this.dataRows[index].pieces = Number((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = Number((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
        if (!this.dataRows[index].boxPerPallet2) {
          this.dataRows[index].pallets2 = 0;
        } else {
          const halfBoxes = this.dataRows[index].boxes - Number((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0));
          this.dataRows[index].pallets2 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet2));
        }
        break;
      case "pallets2":
        this.dataRows[index].boxes = Number((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0)) + Number((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
        this.dataRows[index].pieces = Number((this.dataRows[index].boxes * this.dataRows[index].piecesPerBox).toFixed(0));
        this.dataRows[index].sqmt = Number((this.dataRows[index].boxes * this.dataRows[index].sqmtPerBox).toFixed(0));
        const halfBoxes = this.dataRows[index].boxes - Number((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
        this.dataRows[index].pallets1 = Math.ceil((halfBoxes / this.dataRows[index].boxPerPallet1));
        break;
    }

    this.dataRows[index].calcBoxes = Number((this.dataRows[index].boxPerPallet1 * this.dataRows[index].pallets1).toFixed(0)) + Number((this.dataRows[index].boxPerPallet2 * this.dataRows[index].pallets2).toFixed(0));
    this.dataRows[index].calcSqmt = Number((this.dataRows[index].calcBoxes * this.dataRows[index].sqmtPerBox).toFixed(2));
    this.dataRows[index].calcPercentage = Number((this.dataRows[index].calcBoxes * 100 / this.dataRows[index].boxPerContainer).toFixed(0));
    this.dataRows[index].calcWeight = Number((this.dataRows[index].calcBoxes * this.dataRows[index].weightPerBox).toFixed(0))
    this.dataRows[index].calcContainers = Number((this.dataRows[index].calcBoxes / this.dataRows[index].boxPerContainer).toFixed(2));

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
    this.dataTotal.totalSqmt = this.dataRows.reduce((total, value) => { return total + value.sqmt || 0; }, 0);
    this.dataTotal.totalPieces = this.dataRows.reduce((total, value) => { return total + value.pieces || 0; }, 0);
    this.dataTotal.totalBoxes = this.dataRows.reduce((total, value) => { return total + value.boxes || 0; }, 0);
    this.dataTotal.totalPallets1 = this.dataRows.reduce((total, value) => { return total + value.pallets1 || 0; }, 0);
    this.dataTotal.totalPallets2 = this.dataRows.reduce((total, value) => { return total + value.pallets2 || 0; }, 0);
    this.dataTotal.totalCalcBoxes = this.dataRows.reduce((total, value) => { return total + value.calcBoxes || 0; }, 0);
    this.dataTotal.totalCalcSqmt = this.dataRows.reduce((total, value) => { return total + value.calcSqmt || 0; }, 0);
    this.dataTotal.totalCalcPercentage = this.dataRows.reduce((total, value) => { return total + value.calcPercentage || 0; }, 0);
    this.dataTotal.totalCalcWeight = this.dataRows.reduce((total, value) => { return total + value.calcWeight || 0; }, 0);
    this.dataTotal.totalCalcContainers = this.dataRows.reduce((total, value) => { return total + value.calcContainers || 0; }, 0);

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('rows', JSON.stringify(this.dataRows));
    localStorage.setItem('total', JSON.stringify(this.dataTotal));
  }

  // makeAdjustment() {
  //   const combination = new Array(this.output.length * 2);
  //   for (combination[0] = this.output[0].palletPerContainer1; combination[0] >= 0; combination[0]--) {
  //     for (combination[1] = this.output[0].palletPerContainer2; combination[1] >= 0; combination[1]--) {
  //       for (combination[2] = this.output[1].palletPerContainer1; combination[2] >= 0; combination[2]--) {
  //         for (combination[3] = this.output[1].palletPerContainer2; combination[3] >= 0; combination[3]--) {
  //           for (combination[4] = this.output[2].palletPerContainer1; combination[4] >= 0; combination[4]--) {
  //             for (combination[5] = this.output[2].palletPerContainer2; combination[5] >= 0; combination[5]--) {
  //               for (combination[6] = this.output[3].palletPerContainer1; combination[6] >= 0; combination[6]--) {
  //                 for (combination[7] = this.output[3].palletPerContainer2; combination[7] >= 0; combination[7]--) {
  //                   for (combination[8] = this.output[4].palletPerContainer1; combination[8] >= 0; combination[8]--) {
  //                     for (combination[9] = this.output[4].palletPerContainer2; combination[9] >= 0; combination[9]--) {
  //                       for (combination[10] = this.output[5].palletPerContainer1; combination[10] >= 0; combination[10]--) {
  //                         for (combination[11] = this.output[5].palletPerContainer2; combination[11] >= 0; combination[11]--) {
  //                           for (combination[12] = this.output[6].palletPerContainer1; combination[12] >= 0; combination[12]--) {
  //                             for (combination[13] = this.output[6].palletPerContainer2; combination[13] >= 0; combination[13]--) {
  //                               for (combination[14] = this.output[7].palletPerContainer1; combination[14] >= 0; combination[14]--) {
  //                                 for (combination[15] = this.output[7].palletPerContainer2; combination[15] >= 0; combination[15]--) {
  //                                   for (combination[16] = this.output[8].palletPerContainer1; combination[16] >= 0; combination[16]--) {
  //                                     for (combination[17] = this.output[8].palletPerContainer2; combination[17] >= 0; combination[17]--) {
  //                                       for (combination[18] = this.output[9].palletPerContainer2; combination[18] >= 0; combination[18]--) {

  //                                         if (this.isCombinationValid(combination)) {
  //                                           let totalPercentage = 0;
  //                                           let totalWeight = 0;
  //                                           let totalBoxes = 0;
  //                                           let subCombination = null;
  //                                           for (let index = 0; index < this.output.length; index++) {
  //                                             const element = this.output[index];
  //                                             subCombination = this.getSubCombination(combination, index);
  //                                             const boxes =
  //                                               element.boxPerPallet1 * Number(subCombination[0]) +
  //                                               element.boxPerPallet2 * Number(subCombination[1]);
  //                                             totalBoxes += boxes;
  //                                             totalWeight += boxes * element.boxWeightKg;
  //                                             totalPercentage += Number(
  //                                               ((boxes * 100) / element.boxPerContainer).toFixed(2)
  //                                             );
  //                                           }
  //                                           if (totalPercentage <= 100) {

  //                                             console.log('Combination: ' + combination);
  //                                             console.log('Percentage: ' + totalPercentage);
  //                                             console.log('Weight: ' + totalWeight);
  //                                             console.log('Boxes: ' + totalBoxes);

  //                                             // for (let index = 0; index < this.output.length; index++) {
  //                                             //   subCombination = this.getSubCombination(combination, index);
  //                                             //   this.output[index].palletPerContainer1 = Number(subCombination[0]);
  //                                             //   this.output[index].palletPerContainer2 = Number(subCombination[1]);
  //                                             // }

  //                                             // this.output = this.calculateGivenPallets();
  //                                             // this.outputTotals = this.calculateTotals();
  //                                             // console.log(this.output);
  //                                             return;
  //                                           }
  //                                         }
  //                                       }
  //                                     }
  //                                   }
  //                                 }
  //                               }
  //                             }
  //                           }
  //                         }
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   // let maxNumStr = '';
  //   // for (let index = 0; index < this.output.length; index++) {
  //   //   const element = this.output[index];
  //   //   const numStr1 = element.palletPerContainer1.toString().padStart(1, '0');
  //   //   const numStr2 = element.palletPerContainer2.toString().padStart(1, '0');
  //   //   maxNumStr = maxNumStr + numStr1 + numStr2;
  //   // }
  //   // const maxNum = Number(maxNumStr);
  //   // console.log(typeof maxNum);
  //   // for (let i = maxNum; i > 0; i--) {
  //   //   const numStr = i.toString();
  //   //   if (this.isNumStrValid(numStr)) {
  //   //     let totalPercentage = 0;
  //   //     let totalWeight = 0;
  //   //     let totalBoxes = 0;
  //   //     // let difference = 1000000000;
  //   //     for (let index = 0; index < this.output.length; index++) {
  //   //       const element = this.output[index];
  //   //       const subCombination = this.getSubCombination(numStr, index);
  //   //       const boxes =
  //   //         element.boxPerPallet1 * Number(subCombination[0]) +
  //   //         element.boxPerPallet2 * Number(subCombination[1]);
  //   //       totalBoxes += boxes;
  //   //       totalWeight += boxes * element.boxWeightKg;
  //   //       totalPercentage += Number(
  //   //         ((boxes * 100) / element.boxPerContainer).toFixed(2)
  //   //       );
  //   //     }
  //   //     if (totalPercentage <= 100 && totalWeight <= 27000) {
  //   //       console.log('Percentage:' + totalPercentage);
  //   //       console.log('Weight:' + totalWeight);
  //   //       console.log('Boxes:' + totalBoxes);
  //   //       break;
  //   //     }
  //   //   }
  //   // }
  //   // ///////////////////////////////////////////////////////////////////////////////
  //   // for (let i = 0; i < Math.pow(10, this.input.length * 2); i++) {
  //   //   const number = i.toString().padStart(this.input.length * 2, '0');
  //   //   const combination = number.split('');
  //   //   if (this.isNumberValid(combination)) {
  //   //     let percentage = 0;
  //   //     let weight = 0;
  //   //     let boxes = 0;
  //   //     let difference = 1000000000;
  //   //     for (let index = 0; index < this.input.length; index++) {
  //   //       const element = this.input[index];
  //   //       const boxes1 =
  //   //         element.boxPerPallet1 * Number(combination[index]) +
  //   //         element.boxPerPallet2 * Number(combination[index * 2 + 1]);
  //   //       boxes += boxes1;
  //   //       weight += boxes1 * element.boxWeightKg;
  //   //       percentage += Number(
  //   //         ((boxes1 * 100) / element.boxPerContainer).toFixed(2)
  //   //       );
  //   //     }
  //   //     console.log(percentage);
  //   //     if (percentage >= 100 && weight >= 27000) {
  //   //       for (let index = 0; index < this.input.length; index++) {
  //   //         const element = this.input[index];
  //   //         const text =
  //   //           'Row ' +
  //   //           (index + 1) +
  //   //           ' --> ' +
  //   //           element.boxPerPallet1 +
  //   //           ' x ' +
  //   //           Number(combination[index]) +
  //   //           ' (' +
  //   //           element.boxPerPallet1 * Number(combination[index]) +
  //   //           ')' +
  //   //           (element.boxPerPallet2
  //   //             ? ', ' +
  //   //               element.boxPerPallet2 +
  //   //               ' x ' +
  //   //               Number(combination[index * 2 + 1]) +
  //   //               ' (' +
  //   //               element.boxPerPallet2 * Number(combination[index * 2 + 1]) +
  //   //               ')'
  //   //             : '');
  //   //         console.log(text);
  //   //         this.displayText += text + '<br/>';
  //   //       }
  //   //       console.log('Percentage --> ' + percentage);
  //   //       console.log('Total Boxes --> ' + boxes);
  //   //       console.log('Weight --> ' + (weight / 1000).toFixed(4));
  //   //       this.displayText += 'Percentage --> ' + percentage + '<br/>';
  //   //       this.displayText += 'Total Boxes --> ' + boxes + '<br/>';
  //   //       this.displayText +=
  //   //         'Weight --> ' + (weight / 1000).toFixed(4) + '<br/>';
  //   //       break;
  //   //     }
  //   //   }
  //   // }
  // }

  // // isNumberValid(combination: string[]): boolean {
  // //   let isValid = true;
  // //   for (let index = 0; index < this.input.length; index++) {
  // //     const element = this.input[index];
  // //     if (combination[index] === '0' && combination[index * 2 + 1] === '0') {
  // //       isValid = false;
  // //     }
  // //     if (element.boxPerPallet2 === 0 && combination[index] === '0') {
  // //       isValid = false;
  // //     }
  // //     if (element.boxPerPallet2 === 0 && combination[index * 2 + 1] !== '0') {
  // //       isValid = false;
  // //     }
  // //   }
  // //   return isValid;
  // // }

  // // isNumStrValid(numStr: string): boolean {
  // //   let isValid = true;
  // //   for (let index = 0; index < this.output.length; index++) {
  // //     const element = this.output[index];
  // //     const subCombination = this.getSubCombination(numStr, index);
  // //     if (subCombination[0] === '0' && subCombination[1] === '0') {
  // //       isValid = false;
  // //     }
  // //     if (element.boxPerPallet2 === 0 && subCombination[0] === '0') {
  // //       isValid = false;
  // //     }
  // //     if (element.boxPerPallet2 === 0 && subCombination[1] !== '0') {
  // //       isValid = false;
  // //     }
  // //   }
  // //   return isValid;
  // // }

  // isCombinationValid(combination: any[]): boolean {
  //   let isValid = true;
  //   for (let index = 0; index < this.output.length; index++) {
  //     const element = this.output[index];
  //     const subCombination = this.getSubCombination(combination, index);
  //     if (subCombination[0] === '0' && subCombination[1] === '0') {
  //       isValid = false;
  //     }
  //     if (element.boxPerPallet2 === 0 && subCombination[0] === '0') {
  //       isValid = false;
  //     }
  //     if (element.boxPerPallet2 === 0 && subCombination[1] !== '0') {
  //       isValid = false;
  //     }
  //   }
  //   return isValid;
  // }

  // getSubCombination(numStr: string | any[], index: number): string {
  //   return numStr[index * 2] + '' + numStr[index * 2 + 1];
  // }
}
