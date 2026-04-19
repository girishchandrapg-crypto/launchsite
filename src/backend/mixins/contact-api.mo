import Types "../types/contact";
import ContactLib "../lib/contact";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  submissions : List.List<Types.ContactSubmission>,
  nextId : var Nat,
) {
  public func submitContact(name : Text, email : Text, message : Text) : async { #ok; #err : Text } {
    Runtime.trap("not implemented");
  };

  public query func getContacts() : async [Types.ContactSubmission] {
    Runtime.trap("not implemented");
  };
};
