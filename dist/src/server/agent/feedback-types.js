"use strict";
/**
 * Assertion Feedback System Types
 *
 * Defines types and interfaces for human-in-the-loop feedback on AI-generated
 * assertions in the Deep Research system.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackType = void 0;
/**
 * Types of feedback humans can provide on assertions
 */
var FeedbackType;
(function (FeedbackType) {
    /** Human confirms the assertion is correct and well-sourced */
    FeedbackType["VALIDATE"] = "VALIDATE";
    /** Human challenges the assertion, wants AI to reconsider */
    FeedbackType["CHALLENGE"] = "CHALLENGE";
    /** Human provides correction or refinement to the assertion */
    FeedbackType["REFINE"] = "REFINE";
    /** Human wants more evidence or additional sources */
    FeedbackType["REQUEST_EVIDENCE"] = "REQUEST_EVIDENCE";
    /** Human rejects the assertion as false or misleading */
    FeedbackType["REJECT"] = "REJECT";
})(FeedbackType || (exports.FeedbackType = FeedbackType = {}));
//# sourceMappingURL=feedback-types.js.map