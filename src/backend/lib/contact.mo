import Types "../types/contact";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

module {
  public type ContactSubmission = Types.ContactSubmission;

  public func submit(
    submissions : List.List<ContactSubmission>,
    nextId : Nat,
    name : Text,
    email : Text,
    message : Text,
  ) : { #ok : Nat; #err : Text } {
    Runtime.trap("not implemented");
  };

  public func list(submissions : List.List<ContactSubmission>) : [ContactSubmission] {
    Runtime.trap("not implemented");
  };
};
