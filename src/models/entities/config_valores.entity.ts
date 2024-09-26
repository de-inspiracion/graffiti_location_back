import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Config_ValoresxDefecto' })
export class ConfigValuesEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'Cod_CondicionSAG' })
    codCondicionSAG: number;

    @Column({ name: 'Cod_Temporada', length: 3 })
    codTemporada: string;

    @Column({ name: 'Cod_Personal', length: 10 })
    codPersonal: string;

    @Column({ name: 'Id_Planta' })
    idPlanta: number;

    @Column({ name: 'Cod_Inspeccionado' })
    codInspeccionado: number;

    @Column({ name: 'Cod_NoInspeccionado' })
    codNoInspeccionado: number;

    @Column({ name: 'Cod_Terrestre', length: 3 })
    codTerrestre: string;

    @Column({ name: 'Cod_Maritimo', length: 3 })
    codMaritimo: string;

    @Column({ name: 'Cod_Aereo', length: 3 })
    codAereo: string;

    @Column({ name: 'Cod_Giro' })
    codGiro: string;

    @Column({ name: 'Cod_Ciudad' })
    codCiudad: string;

    @Column({ name: 'Cod_Comuna' })
    codComuna: string;
}