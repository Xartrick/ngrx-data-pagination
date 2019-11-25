import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { AnyEntity } from '../../entity';
import { ObservablePaginationFunction } from '../../iterator/pagination-function';
import { defaultStoreKey } from './default-store-key';
import { NgrxDataPagination } from './ngrx-data-pagination';

export interface PaginationFactoryArgs<Entity extends AnyEntity, NextPageState> {
    contextId?: string,
    paginationFunction: ObservablePaginationFunction<Entity, NextPageState>,
    entityService: EntityCollectionServiceBase<Entity, any>,
}

@Injectable()
export class PaginationFactory {
    private counter = 0;

    constructor(private store: Store<any>) { }

    create<Entity extends AnyEntity, NextPageState>({
        contextId,
        entityService,
        paginationFunction,
    }: PaginationFactoryArgs<Entity, NextPageState>): NgrxDataPagination<Entity, NextPageState> {
        const safeContextId = contextId || `${entityService.entityName}-${this.counter++}`

        return new NgrxDataPagination(
            safeContextId,
            paginationFunction,
            entityService,
            this.store,
            defaultStoreKey,
        );
    }
}