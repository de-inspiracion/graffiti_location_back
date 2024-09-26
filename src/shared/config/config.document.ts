export class ConfigurationDocument {

    static collectionName = 'configurations';

    id: number;
    codCondicionSAG: number;
    codTemporada: string;
    codPersonal: string;
    idPlanta: number;
    codOrigenDestino: string;
    codInspeccionado: number;
    codNoInspeccionado: number;
    codTerrestre: string;
    codMaritimo: string;
    codAereo: string;
    codGiro: string;
    codCiudad: string;
    codComuna: string;
    codTipoEnvase: string;
    codCategoriaEnvase: number;
    codTipoMaterial: string;
    codEspecie: string;
    codColor: string;
}

export interface ConfigurationI {
    id: number;
    codCondicionSAG: number;
    codTemporada: string;
    codPersonal: string;
    idPlanta: number;
    codOrigenDestino: string;
    codInspeccionado: number;
    codNoInspeccionado: number;
    codTerrestre: string;
    codMaritimo: string;
    codAereo: string;
    codGiro: string;
    codCiudad: string;
    codComuna: string;
    createdAt: Date;
    updatedAt: Date;
}