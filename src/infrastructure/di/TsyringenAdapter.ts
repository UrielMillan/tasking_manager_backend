import {DependencyContainer} from "tsyringe";
import {IocAdapter} from "routing-controllers";

export class TsyringenAdapter implements IocAdapter {
    constructor(private readonly container: DependencyContainer) {}

    get<T>(someClass: new (...args: any[]) => T): T {
        return this.container.resolve(someClass);
    }
}
