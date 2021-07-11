import { Injectable } from "@angular/core";
import { Plant } from "../models/plant.model";
import { DexieService } from "../core/dexie.service";

@Injectable()
export class PlantService {
    table: Dexie.Table<Plant, number>;

    constructor(private dexieService: DexieService) {
        this.table = this.dexieService.table('plants');
    }

    getAll() {
        return this.table.toArray();
    }

    add(data) {
        return this.table.add(data);
    }

    update(id, data) {
        return this.table.update(id, data);
    }

    remove(id) {
        return this.table.delete(id);
    }
}