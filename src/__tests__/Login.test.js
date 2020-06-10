import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../component/login";

configure({ adapter: new Adapter() });
describe("Login Component", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<Login />).exists()).toBe(true);
  });
  describe("Validate input fields", () => {
    it("input of email", () => {
      const wrapper = shallow(<Login />);
      wrapper.find("#emailLogin").simulate("change", {
        target: { name: "email", value: "vishnuvnaik@hotmail.com" },
      });
      expect(wrapper.state("email")).toEqual("vishnuvnaik@hotmail.com");
    });
    it("Should Respond to change event and change the Password state.", () => {
      const wrapper = shallow(<Login />);
      wrapper.find("#passLogin").simulate("change", {
        target: {
          name: "password",
          value: "qwertyuiop",
        },
      });
      expect(wrapper.state("password")).toEqual("qwertyuiop");
    });
  });
});
describe("Test case for testing login component", () => {
  it("Email Textfield", () => {
    expect(shallow(<Login />).find("#emailLogin").length).toEqual(1);
  });
  it("Password Textfield", () => {
    expect(shallow(<Login />).find("#passLogin").length).toEqual(1);
  });
});
