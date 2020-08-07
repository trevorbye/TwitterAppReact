import React from "react";
import { shallow, mount } from 'enzyme';
import { TweetApproveCancelBlock } from '../TweetApproveCancelBlock.js';

describe("Approve cancel block tests", () => {

    it("If posted by webjob, nothing displays", () => {
        let tweet = { IsPostedByWebJob: true };
        const wrapper = shallow(<TweetApproveCancelBlock editPaneExpanded={false} tweet={tweet} />);
        expect(wrapper.find("[data-testid='approve-block']").exists()).toBeFalsy();
    });

    it("If edit pane expanded, nothing displays", () => {
        let tweet = { IsPostedByWebJob: false };
        const wrapper = shallow(<TweetApproveCancelBlock editPaneExpanded={true} tweet={tweet} />);
        expect(wrapper.find("[data-testid='approve-block']").exists()).toBeFalsy();
    });

    it("If tweet is approved, can cancel.", () => {
        let tweet = { IsPostedByWebJob: false, IsApprovedByHandle: true };
        const wrapper = shallow(<TweetApproveCancelBlock editPaneExpanded={false} tweet={tweet} />);
        expect(wrapper.text()).toContain("Cancel");
    });

    it("If tweet is approved, cannot approve again.", () => {
        let tweet = { IsPostedByWebJob: false, IsApprovedByHandle: true };
        const wrapper = shallow(<TweetApproveCancelBlock editPaneExpanded={false} tweet={tweet} />);
        expect(wrapper.text()).not.toContain("Approve");
    });

    it("If normal tweet is not approved, can approve", () => {
        let tweet = { IsPostedByWebJob: false, IsApprovedByHandle: false, RewteetNum: 0 };
        const wrapper = shallow(<TweetApproveCancelBlock editPaneExpanded={false} tweet={tweet} />);
        expect(wrapper.text()).toContain("Approve");
    });

    it("If AutoRetweetService tweet is not approved, can retweet.", () => {
        let tweet = { IsPostedByWebJob: false, IsApprovedByHandle: false, RewteetNum: 222 };
        const wrapper = shallow(<TweetApproveCancelBlock editPaneExpanded={false} tweet={tweet} />);
        expect(wrapper.text()).toContain("Approve and retweet");
    });

    it("If normal tweet hasn't been posted, can edit.", () => {
        let tweet = { IsPostedByWebJob: false, IsApprovedByHandle: false, RetweetNum: 0 };
        const wrapper = shallow(<TweetApproveCancelBlock canEdit={true} editPaneExpanded={false} tweet={tweet} />);
        expect(wrapper.text()).toContain("Edit");
    });
    
});
