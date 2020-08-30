export default function RegisterImage() {
  const [preview, setPreview] = useState("");
  const [types, setTypes] = useState(false);
  const [upload, setUpload] = useState(null);
  function handleSelectTypeImage() {
    setTypes(true);
  }

  async function UploadImage() {
    const formData = new FormData();
    formData.append("image", upload);
    console.log(formData)
    const { data } = await api.post("/posts", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // console.log(data)
  }

  async function handleSelectCamera() {
    setTypes(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    })
    if (result.error) {
      console.log("Error")
    } else {
      let prefix;
      let ext;
      if (result.fileName) {
        [prefix, ext] = result.fileName;
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg'
      }
      const imageUpload = {
        uri: result.uri,
        type: result.type,
        name: `${prefix}.${ext}`
      }
      setUpload(imageUpload);
      setPreview(result.uri);
    }
  }
  async function handleSelectGalery() {
    setTypes(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    if (result.error) {
      console.log("Error")
    } else {
      let prefix;
      let ext;
      if (result.fileName) {
        [prefix, ext] = result.fileName;
        ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
      } else {
        prefix = new Date().getTime();
        ext = 'jpg'
      }
      const imageUpload = {
        uri: result.uri,
        type: result.type,
        name: `${prefix}.${ext}`
      }
      setUpload(imageUpload);
      setPreview(result.uri);
    }
  }

  return (
    <SafeAreaView>
      <ImageBackground source={background} style={styles.back} >

        <View style={{
          marginTop: 100,
          justifyContent: "center",
          alignItems: "center",
          width: 230,
          height: 240,
          borderWidth: preview ? 0 : 1,
          borderStyle: "dashed",
          borderColor: "#fff",
          borderRadius: 7,
        }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSelectTypeImage()}
          >
            {types && (
              <View style={styles.containerType}>
                <TouchableOpacity onPress={handleSelectGalery} >
                  <Text style={styles.textButton}>Selecionar da galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelectCamera}>
                  <Text style={styles.textButton}>Capturar da câmera</Text>
                </TouchableOpacity>
              </View>
            )}
            {preview.length > 0 ? (
              <Image style={styles.image} source={{
                uri: preview
              }} />
            ) :
              (<Text></Text>)}
          </TouchableOpacity>
        </View>
        <Text style={styles.bioLabel}>Selecione uma imagem de perfil</Text>
        <TouchableOpacity style={styles.bioButton}>
          <Text style={styles.Label} onPress={UploadImage}>Avançar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
