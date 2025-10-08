// Этот файл сгенерирован автоматически. Не редактируйте вручную.

const TitleSlidePropsSchema = {"$schema":"http://json-schema.org/draft-07/schema#","$ref":"#/definitions/TitleSlidePublicProps","definitions":{"TitleSlidePublicProps":{"type":"object","properties":{"title":{"type":"string"},"subtitle":{"type":"string"},"meme1Src":{"type":"string"},"meme2Src":{"type":"string"}},"required":["title"],"additionalProperties":false}}} as const;

export const slideComponentSchemas: Record<string, any> = {
  "TitleSlide": TitleSlidePropsSchema,
};

