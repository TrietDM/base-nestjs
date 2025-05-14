// export class ListSerialTreatmentModel {
//   id: number;
//   ticketId: string;
//   eventDate: string;
//   diseaseName: string;
//   block: string;
//   room: string;
//   house: string;
//   eventStatusName: string;
//   employee: string;
//   medicineName: string;
//   constructor(partial: Partial<ListSerialTreatmentModel>) {
//     Object.assign(this, partial);
//   }
// }


// export class DetailTreatmentModel {
//   id: number;
//   ticketId: string;
//   eventDate: string;
//   exportDate: string;
//   diseaseName: string;
//   block: string;
//   blockId: number;
//   room: string;
//   roomId: number;
//   house: string;
//   houseId: number;
//   eventStatusName: string;
//   personInCharge: string;
//   medicineName: string;
//   medicineLot: string;
//   medicineExpiry: string;
//   exportId: string;
//   eventStatus: string;
//   herdStat: string;
//   tattoo: string;
//   stig: string;
//   quantity: number;
//   dob: Date;
//   geneticName: string;
//   createdBy: string;
//   updatedBy: string;
//   herdStatId: number;
//   constructor(partial: Partial<DetailTreatmentModel>) {
//     Object.assign(this, partial);
//   }
// }
// export class GroupTreatmentEventModel {
//   id: number;
//   ticketId: string;
//   eventDate: string;
//   exportDate: string;
//   diseaseName: string;
//   diseaseId: number;
//   block: string;
//   blockId: number;
//   room: string;
//   roomId: number;
//   house: string;
//   houseId: number;
//   eventStatusName: string;
//   personInCharge: string;
//   medicineName: string;
//   medicineCode: string;
//   medicineId: number;
//   groupId: number;
//   medicineLot: string;
//   medicineExpiry: string;
//   exportId: string;
//   eventStatus: string;
//   herdStat: string;
//   tattoo: string;
//   stig: string;
//   numberOfDose: number;
//   dob: Date;
//   geneticName: string;
//   createdBy: string;
//   updatedBy: string;
//   herdStatId: number;
//   quantity: number;
//   constructor(partial: Partial<GroupTreatmentEventModel>) {
//     Object.assign(this, partial);
//   }
// }

// export class ChooseGiltTicket {
//   id: number;
//   ticketId: string;
//   eventDate: string;
//   createdBy: string;
//   constructor(partial: Partial<ChooseGiltTicket>) {
//     Object.assign(this, partial);
//   }
// }

import { UserEntity } from "src/infrastructure/entities/user.entity";

export class UserListViewModel{
    id: number;
    username: string;
    password: string;
    job: string;
    constructor(entity: UserEntity) {
    this.id = entity.id;
    this.username = entity.username;
    this.password = entity.password;
    this.job = entity.job?.name || '';
  }

}