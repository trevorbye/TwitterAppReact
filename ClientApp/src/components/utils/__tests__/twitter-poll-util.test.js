import { pollStringToObj } from '../twitter-poll-util';

describe("Tweet poll utility", () => {

    it("create a valid object from undefined", () => {
        expect(pollStringToObj(undefined)).toEqual({ poll1: "", poll2: "", poll3: "", poll4: "", hasPoll: false });
    });
    it("create a valid object from null", () => {
        expect(pollStringToObj(null)).toEqual({ poll1: "", poll2: "", poll3: "", poll4: "", hasPoll: false });
    });
    it("create a valid object from empty string", () => {
        expect(pollStringToObj("")).toEqual({ poll1: "", poll2: "", poll3: "", poll4: "", hasPoll: false });
    });
    it("create a valid object from valid string", () => {
        const text = "alpha:beta:gamma:delta";
        expect(pollStringToObj(text)).toEqual({ poll1: "alpha", poll2: "beta", poll3: "gamma", poll4: "delta", hasPoll: true});
    });
});