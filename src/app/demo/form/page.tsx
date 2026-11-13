"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const signupSchema = z
  .object({
    email: z.email("올바른 이메일 형식이 아닙니다"),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    confirm: z.string(),
    age: z.coerce
      .number<string>("숫자를 입력해주세요")
      .int("정수만 입력할 수 있습니다")
      .min(1, "1 이상이어야 합니다")
      .max(120, "120 이하여야 합니다"),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "비밀번호가 일치하지 않습니다",
  });

type SignupInput = z.input<typeof signupSchema>;
type SignupOutput = z.output<typeof signupSchema>;

export default function FormDemoPage() {
  const [result, setResult] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput, unknown, SignupOutput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirm: "", age: "" },
  });

  return (
    <>
      <h1 className="text-2xl font-bold">폼 · 검증</h1>
      <Card>
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            react-hook-form + zod. 일부러 틀리게 입력하고 제출해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit(({ email, age }) =>
              // 비밀번호는 결과 표시에서 제외
              setResult(JSON.stringify({ email, age }, null, 2)),
            )}
          >
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">이메일</FieldLabel>
                <Input id="email" aria-invalid={!!errors.email} {...register("email")} />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <FieldError errors={[errors.password]} />
              </Field>
              <Field data-invalid={!!errors.confirm}>
                <FieldLabel htmlFor="confirm">비밀번호 확인</FieldLabel>
                <Input
                  id="confirm"
                  type="password"
                  aria-invalid={!!errors.confirm}
                  {...register("confirm")}
                />
                <FieldError errors={[errors.confirm]} />
              </Field>
              <Field data-invalid={!!errors.age}>
                <FieldLabel htmlFor="age">나이</FieldLabel>
                <Input
                  id="age"
                  inputMode="numeric"
                  aria-invalid={!!errors.age}
                  {...register("age")}
                />
                <FieldError errors={[errors.age]} />
              </Field>
              <Button type="submit" className="self-start">
                가입
              </Button>
            </FieldGroup>
          </form>
          {result && <pre className="mt-4 rounded-md bg-muted p-3 text-xs">{result}</pre>}
        </CardContent>
      </Card>
    </>
  );
}
