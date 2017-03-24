import {TestEnvironment, ITestRunner} from "prettygoat-testing";
import expect = require("expect.js");
import AccountsProjection from "../scripts/projections/AccountsProjection";

describe("Given an AccountsProjection", () => {

    let environment: TestEnvironment;
    let runner: ITestRunner<any>;

    before(() => {
        environment = new TestEnvironment();
        environment.setup();
    });

    beforeEach(() => {
        runner = environment.runner();
    });

    context("when an account is created", () => {
        it("should set the status to active", async() => {
            let accountId = "3079581A-8526-4903-8D8F-B8AC57DDF47D";
            let accountName = "Fineco";

            let events = [
                {
                    type: "io.bank.AccountCreated",
                    payload: {
                        id: accountId,
                        name: accountName
                    },
                    timestamp: new Date(2),
                    splitKey: null
                },
                {
                    type: "io.bank.AccountDeleted",
                    payload: {
                        id: accountId,
                    },
                    timestamp: new Date(3),
                    splitKey: null
                }
            ];


            let state = await runner
                .of(AccountsProjection)
                .stopAt(new Date(2))
                .fromEvents(events)
                .run();

            expect(state[accountId].id).to.be(accountId);
            expect(state[accountId].name).to.be(accountName);
            expect(state[accountId].status).to.be("ACTIVE");

        });

    });

    context("when an account is deleted", () => {
        it("should set the status to deleted", async() => {
            let accountId = "3079581A-8526-4903-8D8F-B8AC57DDF47D";
            let accountName = "Fineco";

            let events = [
                {
                    type: "io.bank.AccountCreated",
                    payload: {
                        id: accountId,
                        name: accountName
                    },
                    timestamp: new Date(1),
                    splitKey: null
                },
                {
                    type: "io.bank.AccountDeleted",
                    payload: {
                        id: accountId,
                    },
                    timestamp: new Date(2),
                    splitKey: null
                }
            ];

            let state = await runner
                .of(AccountsProjection)
                .fromEvents(events)
                .run();

            expect(state[accountId].id).to.be(accountId);
            expect(state[accountId].name).to.be(accountName);
            expect(state[accountId].status).to.be("DELETED");
        });

    });

});
