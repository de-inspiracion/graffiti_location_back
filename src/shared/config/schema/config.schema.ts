import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Config extends Document {

    @Prop({ type: Number, default: 0 })
    id: number;

    @Prop({ type: Number, default: 0 })
    codCondicionSAG: number;

    @Prop({ type: String })
    codTemporada: string;

    @Prop({ type: String })
    codPersonal: string;

    @Prop({ type: Number, default: 0 })
    idPlanta: number;

    @Prop({ type: String })
    codOrigenDestino: string;

    @Prop({ type: Number, default: 0 })
    codInspeccionado: number;

    @Prop({ type: Number, default: 0 })
    codNoInspeccionado: number;

    @Prop({ type: String })
    codTerrestre: string;

    @Prop({ type: String })
    codMaritimo: string;

    @Prop({ type: String })
    codAereo: string;

    @Prop({ type: String })
    codGiro: string;

    @Prop({ type: String })
    codCiudad: string;

    @Prop({ type: String })
    codComuna: string;

    @Prop({ type: String })
    codTipoEnvase: string;

    @Prop({ type: Number, default: 0 })
    codCategoriaEnvase: number;

    @Prop({ type: String })
    codTipoMaterial: string;

    @Prop({ type: String })
    codEspecie: string;

    @Prop({ type: String })
    codColor: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);