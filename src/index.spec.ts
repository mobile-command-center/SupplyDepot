import {expect} from 'chai';
import {add} from './index';

describe('index', () => {
    describe('#add', () => {
        it('sholud return 2 when the value is 1, 1', () => {
            expect(add(1,1)).to.equal(2);
        });
    });
});