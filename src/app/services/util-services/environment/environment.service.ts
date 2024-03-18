import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
    version = '';

    setVersion(): void {
        this.version = `${environment.version} ${environment.env.toUpperCase()}`;
    }

    getVersion(): string {
        return this.version;
    }
}
