import React from "react";
import { shallow, mount } from 'enzyme';
import { BasicTweetBlock } from '../BasicTweetBlock.js';

describe("Basic tweet block tests.", () => {

    it("Tweet displays basic data.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            Poll: ""
        };
        const wrapper = shallow(<BasicTweetBlock tweet={tweet} canEdit={true} />);
        expect(wrapper.text()).toContain("a test twitter status");
        expect(wrapper.text()).toContain("@TestHandle");
        expect(wrapper.text()).toContain("12:00");
        expect(wrapper.text()).toContain("email@test.com");
    });

    it("Edit button displays for editable tweet.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            IsPostedByWebJob: false,
            IsApprovedByHandle: false,
            RetweetNum: 0,
            Poll: ""
        };
        const wrapper = mount(<BasicTweetBlock tweet={tweet} canEdit={true} />);
        expect(wrapper.text()).toContain("Edit");
    });

    it("Edit button does not display when canEdit option prop is false.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            IsPostedByWebJob: false,
            IsApprovedByHandle: false,
            RetweetNum: 0,
            Poll: ""
        };
        const wrapper = mount(<BasicTweetBlock tweet={tweet} canEdit={false} />);
        expect(wrapper.text()).not.toContain("Edit");
    });

    it("Clicking edit button opens edit pane.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            IsPostedByWebJob: false,
            IsApprovedByHandle: false,
            RetweetNum: 0,
            Poll: ""
        };
        const wrapper = mount(<BasicTweetBlock tweet={tweet} canEdit={true} />);
        wrapper.find("[data-testid='edit-btn']").simulate("click");
        expect(wrapper.find("[data-testid='edit-pane']").exists()).toBeTruthy();
    });

    it("Open edit pane, change text, close edit pane, resets text.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            IsPostedByWebJob: false,
            IsApprovedByHandle: false,
            RetweetNum: 0,
            Poll: ""
        };
        const wrapper = mount(<BasicTweetBlock tweet={tweet} canEdit={true} />);
        const editBtn = wrapper.find("[data-testid='edit-btn']");
        editBtn.simulate("click");

        const input = wrapper.find("textarea")
        input.simulate('change', { target: { value: 'changed the text' } });
        wrapper.find("[data-testid='collapse-edit-btn']").simulate("click");
        editBtn.simulate("click");

        expect(input.props().value).toEqual("a test twitter status");
    });

    it("Compose-type tweet block shows modified view.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            IsPostedByWebJob: false,
            IsApprovedByHandle: false,
            RetweetNum: 0,
            Poll: ""
        };
        const wrapper = mount(<BasicTweetBlock tweet={tweet} canEdit={false} />);
        expect(wrapper.find("[data-testid='edit-variant']").exists()).toBeFalsy();
        expect(wrapper.find("[data-testid='compose-variant']").exists()).toBeTruthy();
    });

    it("Compose-type tweet block shows approved icon for approved tweet.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            IsPostedByWebJob: false,
            IsApprovedByHandle: true,
            RetweetNum: 0,
            Poll: ""
        };
        const wrapper = mount(<BasicTweetBlock tweet={tweet} canEdit={false} />);
        expect(wrapper.find("[data-testid='approved']").exists()).toBeTruthy();
        expect(wrapper.find("[data-testid='not-approved']").exists()).toBeFalsy();
    });

    it("Compose-type tweet block shows not-approved icon for unapproved tweet.", () => {
        let tweet = {
            StatusBody: "a test twitter status",
            TwitterHandle: "@TestHandle",
            ScheduledStatusTime: "12:00",
            TweetUser: "email@test.com",
            IsPostedByWebJob: false,
            IsApprovedByHandle: false,
            RetweetNum: 0,
            Poll: ""
        };
        const wrapper = mount(<BasicTweetBlock tweet={tweet} canEdit={false} />);
        expect(wrapper.find("[data-testid='not-approved']").exists()).toBeTruthy();
        expect(wrapper.find("[data-testid='approved']").exists()).toBeFalsy();
    });

});