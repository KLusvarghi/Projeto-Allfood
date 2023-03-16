// sendo essa paginação de uma outra interface, utilizando generics
export interface IPaginacao<T> {
    count: number
    next: string
    previous: string
    // sendo uma array de generics
    // sendo assim essa array de 'results' será do tipo de interface que iremos expecificar
    results: T[]
}