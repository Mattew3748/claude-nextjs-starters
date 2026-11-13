"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITY_LABEL, todoFormSchema, type TodoFormValues } from "@/lib/schemas/todo";
import { useTodoStore } from "@/stores/todo-store";

const DEFAULTS: TodoFormValues = { title: "", description: "", priority: "medium" };

export function TodoForm() {
  const add = useTodoStore((s) => s.add);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: DEFAULTS,
  });

  const onSubmit = (values: TodoFormValues) => {
    add(values);
    toast.success("할 일을 추가했습니다");
    reset(DEFAULTS);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">제목</FieldLabel>
          <Input
            id="title"
            placeholder="무엇을 해야 하나요?"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          <FieldError errors={[errors.title]} />
        </Field>
        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">설명 (선택)</FieldLabel>
          <Textarea
            id="description"
            aria-invalid={!!errors.description}
            {...register("description")}
          />
          <FieldError errors={[errors.description]} />
        </Field>
        <Field>
          <FieldLabel>우선순위</FieldLabel>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PRIORITY_LABEL).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Button type="submit" className="self-start">
          추가
        </Button>
      </FieldGroup>
    </form>
  );
}
