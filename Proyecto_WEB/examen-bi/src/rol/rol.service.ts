import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RolEntity} from "./rol.entity";
import {Repository} from "typeorm";

@Injectable()

export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolService: Repository<RolEntity>){

    }

}