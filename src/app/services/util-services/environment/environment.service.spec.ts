import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
    let service: EnvironmentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EnvironmentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should check weather initial version value is empty and if it can be set and read', () => {
        expect(service.version).toEqual('');
        service.setVersion();
        expect(service.getVersion()).toEqual('1.0.0 DEV');
    });
});
