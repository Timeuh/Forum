const goBack = () => {
  const router = useRouter();
  router.go(-1);
};

export default goBack;
