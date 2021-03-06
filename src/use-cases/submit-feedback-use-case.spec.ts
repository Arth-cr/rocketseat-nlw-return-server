import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,04052022",
      }),
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it("should not be able to submit a feedback without type", async () => {
    expect(
      submitFeedback.execute({
        type: "",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,04052022",
      }),
    ).rejects.toThrow()
  })

  it("should not be able to submit a feedback without comment", async () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,04052022",
      }),
    ).rejects.toThrow()
  })

  it("should not be able to submit a feedback with a invalid screenshot", async () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "exemple comment",
        screenshot: "test.jpg",
      }),
    ).rejects.toThrow()
  })
})
