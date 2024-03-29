/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context } from 'fabric-contract-api';
import { ChaincodeStub, ClientIdentity } from 'fabric-shim';
import { TradeTsAssetContract } from '.';

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import winston = require('winston');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext implements Context {
    public stub: sinon.SinonStubbedInstance<ChaincodeStub> = sinon.createStubInstance(ChaincodeStub);
    public clientIdentity: sinon.SinonStubbedInstance<ClientIdentity> = sinon.createStubInstance(ClientIdentity);
    public logging = {
        getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
        setLevel: sinon.stub(),
     };
}

describe('TradeTsAssetContract', () => {

    let contract: TradeTsAssetContract;
    let ctx: TestContext;

    beforeEach(() => {
        contract = new TradeTsAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"trade ts asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"trade ts asset 1002 value"}'));
    });

    describe('#tradeTsAssetExists', () => {

        it('should return true for a trade ts asset', async () => {
            await contract.tradeTsAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a trade ts asset that does not exist', async () => {
            await contract.tradeTsAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createTradeTsAsset', () => {

        it('should create a trade ts asset', async () => {
            await contract.createTradeTsAsset(ctx, '1003', 'trade ts asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"trade ts asset 1003 value"}'));
        });

        it('should throw an error for a trade ts asset that already exists', async () => {
            await contract.createTradeTsAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The trade ts asset 1001 already exists/);
        });

    });

    describe('#readTradeTsAsset', () => {

        it('should return a trade ts asset', async () => {
            await contract.readTradeTsAsset(ctx, '1001').should.eventually.deep.equal({ value: 'trade ts asset 1001 value' });
        });

        it('should throw an error for a trade ts asset that does not exist', async () => {
            await contract.readTradeTsAsset(ctx, '1003').should.be.rejectedWith(/The trade ts asset 1003 does not exist/);
        });

    });

    describe('#updateTradeTsAsset', () => {

        it('should update a trade ts asset', async () => {
            await contract.updateTradeTsAsset(ctx, '1001', 'trade ts asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"trade ts asset 1001 new value"}'));
        });

        it('should throw an error for a trade ts asset that does not exist', async () => {
            await contract.updateTradeTsAsset(ctx, '1003', 'trade ts asset 1003 new value').should.be.rejectedWith(/The trade ts asset 1003 does not exist/);
        });

    });

    describe('#deleteTradeTsAsset', () => {

        it('should delete a trade ts asset', async () => {
            await contract.deleteTradeTsAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a trade ts asset that does not exist', async () => {
            await contract.deleteTradeTsAsset(ctx, '1003').should.be.rejectedWith(/The trade ts asset 1003 does not exist/);
        });

    });

});
