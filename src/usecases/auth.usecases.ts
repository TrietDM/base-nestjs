// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Inject } from '@nestjs/common';
// import { InjectDataSource } from '@nestjs/typeorm';
// import { IDiseaseRepository } from 'src/domain/repositories/diseaseRepository.interface';
// import { IEventRepository } from 'src/domain/repositories/eventRepository.interface';
// import { IEventTicketRepository } from 'src/domain/repositories/eventTicketRepository.interface';
// import { IMedicineRepository } from 'src/domain/repositories/medicineRepository.interface';
// import { IPigEventRepository } from 'src/domain/repositories/pigEventRepository.interface';
// import { IPigInfoRepository } from 'src/domain/repositories/pigInfoRepository.interface';
// import { ITreatmentRepository } from 'src/domain/repositories/treatmentRepository.interface';
// import { DataSource } from 'typeorm';

// export class authUseCases {
//   constructor(
//     @Inject('IDiseaseRepository')
//     private readonly diseaseRepository: IDiseaseRepository,
//     @Inject('IMedicineRepository')
//     private readonly medicineRepository: IMedicineRepository,
//     @Inject('IEventTicketRepository')
//     private readonly eventTicketRepository: IEventTicketRepository,
//     @Inject('IPigInfoRepository')
//     private readonly pigInfoRepository: IPigInfoRepository,
//     @Inject('IEventRepository')
//     private readonly eventRepository: IEventRepository,
//     @Inject('IPigEventRepository')
//     private readonly pigEventRepository: IPigEventRepository,
//     @Inject('ITreatmentRepository')
//     private readonly treatmentRepository: ITreatmentRepository,
//     @InjectDataSource()
//     private readonly dataSource: DataSource,
//   ) {}
//   async findAllDisease(): Promise<any> {
//     return 'this.diseaseRepository.findAllDisease()';
//   }
// }
