import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar, Alert, ScrollView } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const LIVROS = [
 {id:1,titulo:'O Pequeno Príncipe',autor:'Antoine de Saint-Exupéry',descricao:'Um clássico sobre amizade, afeto e a maneira de enxergar o mundo.',capa:'📘'},
 {id:2,titulo:'Dom Casmurro',autor:'Machado de Assis',descricao:'Romance clássico da literatura brasileira.',capa:'📕'},
 {id:3,titulo:'A Moreninha',autor:'Joaquim Manuel de Macedo',descricao:'Um dos romances mais conhecidos do Romantismo brasileiro.',capa:'📗'},
 {id:4,titulo:'Capitães da Areia',autor:'Jorge Amado',descricao:'História de jovens que vivem nas ruas de Salvador.',capa:'📙'}
];

export default function App(){
 const [tela,setTela]=useState('inicio'); const [livro,setLivro]=useState(null);
 const abrirLivro=(item)=>{setLivro(item);setTela('detalhe')};
 const voltar=()=>{if(tela==='comoParticipar'||tela==='acervo')setTela('inicio');else if(tela==='detalhe')setTela('acervo')};
 const trocar=()=>Alert.alert('Troca de livro',`Você escolheu trocar o livro "${livro.titulo}".\n\nA troca está simulada nesta versão.`);
 return <SafeAreaView style={s.safe}><ExpoStatusBar style="dark"/><StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
  {tela==='inicio'&&<Inicio acervo={()=>setTela('acervo')} participar={()=>setTela('comoParticipar')}/>} 
  {tela==='comoParticipar'&&<ComoParticipar voltar={voltar}/>} 
  {tela==='acervo'&&<Acervo livros={LIVROS} abrir={abrirLivro} voltar={voltar}/>} 
  {tela==='detalhe'&&livro&&<Detalhe livro={livro} voltar={voltar} trocar={trocar}/>} 
 </SafeAreaView>;
}

function Inicio({acervo,participar}){return <ScrollView contentContainerStyle={s.container}>
 <View style={s.logo}><Text style={s.logo1}>FEIRÃO</Text><Text style={s.logo2}>DO LIVRO</Text></View>
 <Text style={s.title}>Feirão do Livro</Text><Text style={s.desc}>Doação e troca de livros entre a turma e a comunidade.</Text>
 <TouchableOpacity style={s.primary} onPress={acervo}><Text style={s.primaryText}>Ver acervo</Text></TouchableOpacity>
 <TouchableOpacity style={s.secondary} onPress={participar}><Text style={s.secondaryText}>Como participar</Text></TouchableOpacity>
 </ScrollView>}

function ComoParticipar({voltar}){const passos=['Escolha um livro disponível no acervo.','Confira os detalhes do livro escolhido.','Combine a troca com outro participante.','Leve seu livro para o Feirão.','Faça a troca e aproveite sua nova leitura!'];return <ScrollView contentContainerStyle={s.container}>
 <Text style={s.small}>COMO PARTICIPAR</Text><Text style={s.title}>Como participar</Text>
 <View style={s.steps}>{passos.map((p,i)=><View style={s.step} key={i}><View style={s.circle}><Text style={s.circleText}>{i+1}</Text></View><Text style={s.stepText}>{p}</Text></View>)}</View>
 <TouchableOpacity style={s.back} onPress={voltar}><Text style={s.backText}>Voltar</Text></TouchableOpacity></ScrollView>}

function Acervo({livros,abrir,voltar}){return <View style={s.screen}><Text style={s.small}>ACERVO</Text><Text style={s.title}>Livros disponíveis</Text><Text style={s.desc}>Toque em um livro para ver seus detalhes.</Text>
 <FlatList data={livros} keyExtractor={x=>String(x.id)} contentContainerStyle={s.list} showsVerticalScrollIndicator={false} renderItem={({item})=><TouchableOpacity style={s.book} onPress={()=>abrir(item)}><View style={s.coverSmall}><Text style={s.emoji}>{item.capa}</Text></View><View style={s.bookInfo}><Text style={s.bookTitle}>{item.titulo}</Text><Text style={s.author}>{item.autor}</Text><Text style={s.hint}>Toque para ver →</Text></View></TouchableOpacity>}/>
 <TouchableOpacity style={s.back} onPress={voltar}><Text style={s.backText}>Voltar</Text></TouchableOpacity></View>}

function Detalhe({livro,voltar,trocar}){return <ScrollView contentContainerStyle={s.container}><Text style={s.small}>DETALHE DO LIVRO</Text><Text style={s.title}>{livro.titulo}</Text>
 <View style={s.detail}><View style={s.bigCover}><Text style={s.bigEmoji}>{livro.capa}</Text><Text style={s.coverText}>CAPA</Text></View><Text style={s.detailTitle}>{livro.titulo}</Text><Text style={s.detailAuthor}>{livro.autor}</Text><View style={s.separator}/><Text style={s.detailDesc}>{livro.descricao}</Text></View>
 <TouchableOpacity style={s.primary} onPress={trocar}><Text style={s.primaryText}>Troca</Text></TouchableOpacity><TouchableOpacity style={s.back} onPress={voltar}><Text style={s.backText}>Voltar</Text></TouchableOpacity></ScrollView>}

const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#fff'},screen:{flex:1,padding:22,paddingTop:18},container:{flexGrow:1,padding:22,backgroundColor:'#fff'},logo:{height:180,borderWidth:2,borderColor:'#20252B',borderRadius:14,alignItems:'center',justifyContent:'center',backgroundColor:'#F7F9FB',marginBottom:28},logo1:{fontSize:27,fontWeight:'800',color:'#20252B'},logo2:{fontSize:27,fontWeight:'800',color:'#0799D5'},small:{fontSize:12,fontWeight:'800',letterSpacing:1.5,color:'#0799D5',marginBottom:8},title:{fontSize:30,fontWeight:'800',color:'#171B21',marginBottom:8},desc:{fontSize:16,lineHeight:23,color:'#66717D',marginBottom:24},primary:{width:'100%',minHeight:52,borderRadius:8,backgroundColor:'#0799D5',alignItems:'center',justifyContent:'center',marginBottom:12},primaryText:{color:'#fff',fontSize:16,fontWeight:'800'},secondary:{width:'100%',minHeight:52,borderRadius:8,borderWidth:1.5,borderColor:'#1E2731',backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginBottom:12},secondaryText:{color:'#1E2731',fontSize:16,fontWeight:'700'},back:{width:'100%',minHeight:50,borderRadius:8,borderWidth:1.5,borderColor:'#7B8794',backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginTop:8,marginBottom:16},backText:{color:'#1E2731',fontSize:16,fontWeight:'700'},steps:{borderWidth:1,borderColor:'#D7DEE5',borderRadius:14,padding:18,marginBottom:18},step:{flexDirection:'row',alignItems:'center',marginBottom:20},circle:{width:38,height:38,borderRadius:19,borderWidth:2,borderColor:'#0799D5',alignItems:'center',justifyContent:'center',marginRight:14},circleText:{color:'#0799D5',fontSize:16,fontWeight:'800'},stepText:{flex:1,fontSize:15,lineHeight:21,color:'#39434D'},list:{paddingTop:8,paddingBottom:12},book:{flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#D7DEE5',borderRadius:12,padding:12,marginBottom:12,backgroundColor:'#fff'},coverSmall:{width:62,height:78,borderRadius:6,backgroundColor:'#EEF5F9',borderWidth:1,borderColor:'#A9B8C4',alignItems:'center',justifyContent:'center',marginRight:14},emoji:{fontSize:28},bookInfo:{flex:1},bookTitle:{fontSize:17,fontWeight:'800',color:'#20252B',marginBottom:4},author:{fontSize:14,color:'#65727E',marginBottom:8},hint:{fontSize:12,fontWeight:'700',color:'#0799D5'},detail:{borderWidth:1,borderColor:'#D7DEE5',borderRadius:14,padding:18,marginBottom:18,alignItems:'center'},bigCover:{width:150,height:205,borderRadius:8,borderWidth:1.5,borderColor:'#7D8A96',backgroundColor:'#F4F7F9',alignItems:'center',justifyContent:'center',marginBottom:20},bigEmoji:{fontSize:54,marginBottom:12},coverText:{fontSize:11,color:'#6D7882',fontWeight:'700'},detailTitle:{width:'100%',fontSize:22,fontWeight:'800',color:'#20252B'},detailAuthor:{width:'100%',fontSize:15,color:'#65727E',marginTop:5},separator:{width:'100%',height:1,backgroundColor:'#20252B',marginVertical:18},detailDesc:{width:'100%',fontSize:15,lineHeight:22,color:'#46515B'}});
