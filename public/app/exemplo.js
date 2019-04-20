'use strict';
(function () {
    angular.module('SGPJ')
            .controller('homeController', function ($scope, $location, $http, $log, $httpParamSerializer, $timeout, $rootScope) {
                $scope.infTotRes = "Mostrando 0 resultados.";
                $scope.dateFormat = 'dd/MM/yyyy';
                $scope.maxSize = 10;
                $scope.limit = 20;
                $scope.currentPage = 0;
                $scope.classBoolean = false;
                $scope.mostrarInfo = false;
                $scope.mostrarDatePicker = false;
                $scope.buscandoProjetos = false;
                $scope.buscandoProjetosInf = false;
                $scope.buscandoParticipantes = false;
                $scope.resp = false;
                $scope.respCampus = false;
                $scope.respSituacao = false;
                $scope.respAtividades = false;
                $scope.respArConhecimento = false;
                $scope.Collapsed = true;
                $scope.dataFilter = null;
                $scope.date = null;
                $scope.buscarPorAtivos = false;
                $scope.buscarPorInadimplentes = false;
                $scope.condicoes = [];
                $scope.listaDeAtividades = [];
                $scope.listaDeArConhecimento = [];
                $scope.listaDeSituacoes = [];
                $scope.valoresFiltro = [];
                $scope.filtersCodigos = [];
                $scope.filtersDescricao = [];
                $scope.listaDeCentros = $scope.condicaoComum;
                $scope.isDate = false;
                $scope.showData = true;
                $scope.showCentro = true;
                $scope.classTable = [
                    {class: ''},
                    {class: 'info'}
                ];
                if (screen.width <= 320) {
                    $scope.maxSize = 2;
                    $scope.showData = false;
                        $scope.showCentro = false;
                } else {
                    if (screen.width <= 375) {
                        $scope.showData = false;
                        $scope.showCentro = false;
                    } else {
                        if (screen.width <= 380) {
                            $scope.maxSize = 4;
                        } else {
                            if (screen.width <= 425) {
                                $scope.maxSize = 6;
                                $scope.showData = false;
                            }
                        }
                    }
                }

                $scope.trocaClassBoolean = function () {
                    if ($scope.classBoolean) {
                        $scope.classBoolean = false;
                    } else {
                        $scope.classBoolean = true;
                    }
                };

                $scope.bindInformation = function (numProjeto) {
                    $scope.mostrarInfo = true;
                    getProjetosInfo(numProjeto);
                    getPrjHstParticipante(numProjeto);
                    $scope.active = 0;
                };

                $scope.bindProjetos = function () {
                    $scope.mostrarInfo = false;
                    $scope.projetoComplete = null;
                    $scope.PrjHstParticipante = null;
                };

                $scope.pageChanged = function () {
                    var start = ($scope.currentPage - 1) * $scope.limit;
                    filtrarBuscaAvancada(start);
                };

                if ($rootScope.filtrosCod != null || $scope.currentPg > 0 || $rootScope.campBusca != null) {
                    $rootScope.fCodigos = $rootScope.filtrosCod;
                    $rootScope.fDescricao = $rootScope.filtersDesc;
                    $rootScope.cPage = $rootScope.currentPg;
                    $rootScope.buscar = $rootScope.campBusca;
                    $scope.filtersCodigos = $rootScope.fCodigos;
                    $scope.filtersDescricao = $rootScope.fDescricao;
                    $scope.filtroDeBusca = $rootScope.buscar;
                    $scope.Busca = $rootScope.buscar;
                    $scope.currentPage = ($rootScope.cPage);
                } else {
                    getProjetos(null, null, 0, $scope.limit, null, null);
                }

                $scope.filter = {
                    tipoFiltragem: "",
                    condicaoFiltragem: "",
                    valorFiltro: ""
                };
                $scope.condicaoComum = [//engloba Tipo de Atividade, Grande Área e Situação Atual
                    {chave: '0', valor: 'Igual'},
                    {chave: '1', valor: 'Diferente'}
                ];
                $scope.condicaoParticipante = [//apenas participantes
                    {chave: '0', valor: 'Igual'}
                ];
                $scope.condicaoData = [//apenas data
                    {chave: '0', valor: 'Igual'},
                    {chave: '1', valor: 'Diferente'},
                    {chave: '2', valor: 'Menor'},
                    {chave: '3', valor: 'Maior'}
                ];
                $scope.tiposFiltragens = [
                    {chave: '0', valor: 'Unidade'},
                    {chave: '1', valor: 'Centro'},
                    {chave: '2', valor: 'Tipo de Atividade'},
                    {chave: '3', valor: "Grande Área"},
                    {chave: '4', valor: "Situação Atual"},
                    {chave: '5', valor: 'Participante'},
                    {chave: '6', valor: 'Data de Início'}
                ];
                $scope.status = {
                    isCustomHeaderOpen: false,
                    isFirstOpen: true,
                    open: false,
                    isFirstDisabled: false
                };
                $scope.search = function () {
                    var aux = "";
                    $scope.Busca = $scope.filtroDeBusca;
                    if ($scope.Busca.indexOf('"') != -1) {
                        for (var i = 0, max = $scope.Busca.length; i < max; i++) {
                            if ($scope.Busca[i] == '"') {
                                aux += '\\"';
                            } else {
                                aux += $scope.Busca[i];
                            }
                        }
                        $scope.Busca = aux;
                    }

                    filtrarBuscaAvancada(0);
                    $scope.currentPage = 1;
                };

                //Ajax
                function getProjetos(Filter, Sort, Start, Limit, Map, ExtraParams) {
                    $scope.buscandoProjetos = true;
                    $scope.infTotRes = "Buscando...";
                    $scope.projetos = [];
                    $http({
                        method: 'POST',
                        url: '/sgpj/prjAtvExtensao/pesquisa',
                        params: {
                            filter: Filter,
                            sort: '[{property:"projeto.prjDtInicio",direction:"DESC"}]',
                            start: Start,
                            limit: Limit,
                            map: Map,
                            extraParams: ExtraParams}
                    }).then(function succesCallBack(response) {
                        $scope.projetos = response.data.data;
                        $scope.totalItems = response.data.total;
                        for (var i = 0, max = $scope.projetos.length; i < max; i++) {
                            if ($scope.projetos[i].projeto.prjCampus.strCodigo.strCodigo == $scope.projetos[i].projeto.strProjeto.strCodigo) {
                                $scope.projetos[i].projeto.strProjeto.strDescricao = "";
                            }
                            if ((i % 2) == 0) {
                                $scope.projetos[i].class = "info";
                            } else {
                                $scope.projetos[i].class = "active";

                            }
                        }
                        $scope.buscandoProjetos = false;
                        $scope.infTotRes = "Mostrando do " + (Start + 1) + " ao " + ($scope.projetos.length + Start) + " de " + $scope.totalItems + " resultados.";
                        $scope.resp = false;
                    }
                    , function errorCallBack(response) {
                        $scope.buscandoProjetos = false;
                        $scope.resp = true;
                    });
                }
                ;
                function getSetor(Filter, Sort, Start, Limit, Map, ExtraParams) {
                    var url = 'pesquisa';
                    var filter = '[' +
                            '   {property:"tblGrlItmTpSetor.tblGrlItemPK.tblGrlCodigo",value:"TpSetor",comparison:"eq"}' +
//                            '   {property:"tblGrlItmTpSetor.tblGrlItemPK.tblGrlItmCodigo",value:"HU",comparison:"eq"}' +
//                            '   {property:"tblGrlItmTpSetor.tblGrlItemPK.tblGrlItmCodigo",value:"Reitoria",comparison:"eq"}' +
//                            '   {property:"tblGrlItmTpSetor.tblGrlItemPK.tblGrlItmCodigo",value:"Campus",comparison:"eq"}' +
                            ']';
                    if (Filter == 'Centro') {
                        url += 'Centro';
                        filter = '[' +
                                '{property:"tblGrlItmTpSetor.tblGrlItemPK.tblGrlCodigo",value:"TpSetor",comparison:"eq"},' +
                                '{property:"tblGrlItmTpSetor.tblGrlItemPK.tblGrlItmCodigo",value:"Centro",comparison:"eq"},' +
                                '{property:"strCodigo",value:"SAREH",comparison:"ne"}' +
                                ']';
                    }
                    $http({
                        method: 'POST',
                        url: '/sgpj/setor/' + url,
                        params: {
                            sort: null,
                            filter: filter,
                            start: Start,
                            limit: Limit,
                            map: null,
                            extraParams: ExtraParams}
                    }).then(function succesCallBack(response) {
                        $scope.listaDeCampus = response.data.data; //tambem usado para armazenar o retorno dos centros
                        $scope.valoresFiltro = [];
                        for (var i = 0, max = response.data.total; i < max; i++) {
                            if (Filter == 'Centro') {
                                $scope.valoresFiltro[i] = {chave: $scope.listaDeCampus[i].strCodigo, valor: ($scope.listaDeCampus[i].strDescricao + ' - ' + $scope.listaDeCampus[i].strCodigo)};
                            } else {
                                $scope.valoresFiltro[i] = {chave: $scope.listaDeCampus[i].strCodigo, valor: $scope.listaDeCampus[i].strDescricao};
                            }
                        }
                        $scope.respCampus = false;
                    }, function errorCallBack(response) {
                        $scope.respCampus = true;
                    });
                }
                ;
                function getAtividade(Filter, Sort, Start, Limit, Map, ExtraParams) {
                    $http({
                        method: 'POST',
                        url: '/sgpj/atividade/pesquisa',
                        params: {
                            sort: Sort,
                            filter: Filter,
                            start: Start,
                            limit: Limit,
                            map: Map,
                            extraParams: ExtraParams}
                    }).then(function succesCallBack(response) {
                        $scope.listaDeAtividades = response.data.data;
                        $scope.valoresFiltro = [];
                        for (var i = 0, max = $scope.listaDeAtividades.length; i < max; i++) {
                            $scope.valoresFiltro[i] = {chave: $scope.listaDeAtividades[i].atvCodigo, valor: $scope.listaDeAtividades[i].atvDescricao};
                        }
                        $scope.respAtividades = false;
                    }, function errorCallBack(response) {
                        $scope.respAtividades = true;
                    });
                }
                ;
                function getArConhecimento(Filter, Sort, Start, Limit, Map, ExtraParams) {
                    $http({
                        method: 'POST',
                        url: '/sgpj/arConhecimento/pesquisa',
                        params: {
                            sort: Sort,
                            filter: '[{property:"tpArCnhCodigo.tpArCnhCodigo",value:"' + (0) + '",comparison:"eq"}]',
                            start: Start,
                            limit: Limit,
                            map: Map,
                            extraParams: ExtraParams}
                    }).then(function succesCallBack(response) {
                        $scope.listaDeArConhecimento = response.data.data;
                        $scope.valoresFiltro = [];
                        for (var i = 0, max = $scope.listaDeArConhecimento.length; i < max; i++) {
                            $scope.valoresFiltro[i] = {chave: $scope.listaDeArConhecimento[i].arCnhCodigo, valor: $scope.listaDeArConhecimento[i].arCnhDescricao};
                        }
                        $scope.respArConhecimento = false;
                    }, function errorCallBack(response) {
                        $scope.respArConhecimento = true;
                    });
                }
                ;
                function getSituacao(Filter, Sort, Start, Limit, Map, ExtraParams) {
                    $http({
                        method: 'POST',
                        url: '/sgpj/situacao/pesquisa',
                        params: {
                            filter: '[{property:"stcDescricao",value:"' + ("%") + '",comparison:"search"}]',
                            sort: Sort,
                            start: Start,
                            limit: Limit,
                            map: Map,
                            extraParams: ExtraParams}
                    }).then(function succesCallBack(response) {
                        $scope.listaDeSituacoes = response.data.data;
                        $scope.valoresFiltro = [];
                        for (var i = 0, max = $scope.listaDeSituacoes.length; i < max; i++) {
                            $scope.valoresFiltro[i] = {chave: $scope.listaDeSituacoes[i].stcCodigo, valor: $scope.listaDeSituacoes[i].stcDescricao};
                        }
                        $scope.respSituacao = false;
                    }, function errorCallBack(response) {
                        $scope.respSituacao = true;
                    });
                }
                ;
                //fim Ajax

                $scope.deleteFiltro = function (id) {
                    var filtersTmpD = [];
                    var filtersTmpC = [];
                    for (var i = 0, max = $scope.filtersCodigos.length; i < max; i++) {
                        if (i != id) {
                            filtersTmpC.push($scope.filtersCodigos[i]);
                            filtersTmpD.push($scope.filtersDescricao[i]);
                        }
                    }
                    for (var i = 0, max = $scope.filtersCodigos.length; i < max; i++) {
                        $scope.filtersCodigos.pop();
                        $scope.filtersDescricao.pop();
                    }
                    for (var i = 0, max = filtersTmpC.length; i < max; i++) {
                        $scope.filtersCodigos.push(filtersTmpC[i]);
                        $scope.filtersDescricao.push(filtersTmpD[i]);
                    }
                    filtrarBuscaAvancada(0);
                };
                $scope.addFiltro = function (filter) {
                    $scope.filtersCodigos.push(angular.copy(filter));

                    var tipoFiltragem;
                    var condicaoFiltragem;
                    var valorFiltro;
                    for (var i = 0, max = $scope.tiposFiltragens.length; i < max; i++) {
                        if ($scope.tiposFiltragens[i].chave == $scope.filter.tipoFiltragem) {
                            tipoFiltragem = $scope.tiposFiltragens[i].valor;
                        }
                    }

                    for (var i = 0, max = $scope.condicoes.length; i < max; i++) {
                        if ($scope.condicoes[i].chave == $scope.filter.condicaoFiltragem) {
                            condicaoFiltragem = $scope.condicoes[i].valor;
                        }
                    }

                    if ($scope.filter.tipoFiltragem < 5) {
                        for (var i = 0, max = $scope.valoresFiltro.length; i < max; i++) {
                            if ($scope.valoresFiltro[i].chave == $scope.filter.valorFiltro) {
                                valorFiltro = $scope.valoresFiltro[i].valor;
                            }
                        }
                    } else {
                        if ($scope.filter.tipoFiltragem == 5) {
                            valorFiltro = $scope.filter.valorFiltro;
                        } else {

                            var dia = '0';
                            if ($scope.filter.valorFiltro.getDate() < 10) {
                                dia += $scope.filter.valorFiltro.getDate();
                            } else {
                                dia = $scope.filter.valorFiltro.getDate();
                            }

                            var mes = '0';
                            if (($scope.filter.valorFiltro.getMonth() + 1) < 10) {
                                mes += ($scope.filter.valorFiltro.getMonth() + 1);
                            } else {
                                mes = ($scope.filter.valorFiltro.getMonth() + 1);
                            }

                            var data = dia + '/' + mes + '/' + $scope.filter.valorFiltro.getFullYear();
                            valorFiltro = data;
                        }
                    }

                    $scope.limparFiltros();
                    $scope.filter = {
                        tipoFiltragem: tipoFiltragem,
                        condicaoFiltragem: condicaoFiltragem,
                        valorFiltro: valorFiltro
                    };
                    $scope.filtersDescricao.push(angular.copy($scope.filter));
                    $scope.limparFiltros();
                    filtrarBuscaAvancada(0);
                };
                var filtroBusca;
                function filtrarBuscaAvancada(cPage) {
                    filtroBusca = '[{property:"projeto.prjNumero,projeto.prjDtInicio,projeto.prjTitulo,projeto.strProjeto.strDescricao, projeto.stcCodigo.stcDescricao",value:"'
                            + ($scope.Busca || "%") + '",comparison:"search"}'; //se nada for digitado ele busca por qualquer coisa %
                    if ($scope.filtersCodigos.length > 0) {//se existir alguma busca avançada adicionada
                        filtroBusca += ',';
                        for (var i = 0, max = $scope.filtersCodigos.length; i < max; i++) {
                            var condicao;
                            //setando a condição de filtragem
                            if ($scope.filtersCodigos[i].condicaoFiltragem == "0") {//Codição Iguais
                                condicao = "eq";
                            }
                            if ($scope.filtersCodigos[i].condicaoFiltragem == "1") {//Codição Diferentes
                                condicao = "ne";
                            }
                            if ($scope.filtersCodigos[i].condicaoFiltragem == "2") {//Codição Menores ou Iguais
                                condicao = "lt";
                            }
                            if ($scope.filtersCodigos[i].condicaoFiltragem == "3") {//Codição Maiores ou Iguais
                                condicao = "gt";
                            }

                            //setando o campo do tipo de filtragem
                            if ($scope.filtersCodigos[i].tipoFiltragem == "0") {//Filtrar por Campus
                                filtroBusca += '{property:"projeto.prjCampus.strCodigo.strCodigo", value:"' + $scope.filtersCodigos[i].valorFiltro + '", comparison:"' + condicao + '"}';
                            }
                            if ($scope.filtersCodigos[i].tipoFiltragem == "1") {//Filtrar por Centro
                                filtroBusca += '{property:"projeto.strProjeto.strCodigo", value:"' + $scope.filtersCodigos[i].valorFiltro + '", comparison:"' + condicao + '"}';
                            }
                            if ($scope.filtersCodigos[i].tipoFiltragem == "2") {//Filtrar por Tipo de Atividade
                                filtroBusca += '{property:"atvCodigo.atvCodigo", value:"' + $scope.filtersCodigos[i].valorFiltro + '", comparison:"' + condicao + '"}';
                            }
                            if ($scope.filtersCodigos[i].tipoFiltragem == "3") {//Filtrar por Grande Área
                                filtroBusca += '{property:"projeto.arCnhGrdArea.arCnhCodigo", value:"' + $scope.filtersCodigos[i].valorFiltro + '", comparison:"' + condicao + '"}';
                            }
                            if ($scope.filtersCodigos[i].tipoFiltragem == "4") {//Filtrar por Situação Atual
                                filtroBusca += '{property:"projeto.stcCodigo.stcCodigo", value:"' + $scope.filtersCodigos[i].valorFiltro + '", comparison:"' + condicao + '"}';
                            }
                            if ($scope.filtersCodigos[i].tipoFiltragem == "5") {//Filtrar por participante
                                filtroBusca += '{property:"participante", value:"' + $scope.filtersCodigos[i].valorFiltro + '", comparison:""}';
                            }
                            if ($scope.filtersCodigos[i].tipoFiltragem == "6") {//Filtrar por Data

                                var dia = '0';
                                if ($scope.filtersCodigos[i].valorFiltro.getDate() < 10) {
                                    dia += $scope.filtersCodigos[i].valorFiltro.getDate();
                                } else {
                                    dia = $scope.filtersCodigos[i].valorFiltro.getDate();
                                }

                                var mes = '0';
                                if (($scope.filtersCodigos[i].valorFiltro.getMonth() + 1) < 10) {
                                    mes += ($scope.filtersCodigos[i].valorFiltro.getMonth() + 1);
                                } else {
                                    mes = ($scope.filtersCodigos[i].valorFiltro.getMonth() + 1);
                                }

                                var data = dia + '/' + mes + '/' + $scope.filtersCodigos[i].valorFiltro.getFullYear();
                                filtroBusca += '{property:"projeto.prjDtInicio", value:"' + data + '", comparison:"' + condicao + '"}';
                            }
                            if (max > 1 && i + 1 < max) {
                                filtroBusca += ',';
                            }
                        }
                    }
                    var ativos = 0;
                    if ($scope.buscarPorAtivos) {
                        ativos = 1;
//                        filtroBusca += ',';
//                        filtroBusca += '{property:"projeto.prjDtTermino", value:"", comparison:"isNull"}';
                    }
                    if ($scope.buscarPorInadimplentes) {
                        filtroBusca += ',';
                        filtroBusca += '{property:"projeto.stcCodigo.stcDescricao", value:"inadimplente", comparison:"search"}';
                    }
                    filtroBusca += ']';
                    getProjetos(filtroBusca, null, cPage, $scope.limit, null, ativos);
                }
                ;

                $scope.buscarAtivos = function (op) {
                    if (op) {
                        $scope.buscarPorAtivos = true;
                        filtrarBuscaAvancada(0);
                    } else {
                        $scope.buscarPorAtivos = false;
                        filtrarBuscaAvancada(0);
                    }
                };
                $scope.buscarInadimplentes = function (op) {
                    if (op) {
                        $scope.buscarPorInadimplentes = true;
                        filtrarBuscaAvancada(0);
                    } else {
                        $scope.buscarPorInadimplentes = false;
                        filtrarBuscaAvancada(0);
                    }
                };

                $scope.mostrarMsgErro = function (addMsgErro) {//deve ser passado a mensagem que será adicionada ao retorno do erro
                    return "Não foi possivel " + addMsgErro + ", por favor, recarregue a pagina, se o erro persistir, entre em contato com o suporte técnico.";
                };
                $scope.limparFiltros = function () {
                    $scope.filter = {
                        tipoFiltragem: "",
                        condicaoFiltragem: "",
                        valorFiltro: ""
                    };
                };
                var valorAnterior;
                $scope.trocaFiltros = function () {
                    if ($scope.filter.tipoFiltragem != "") {
                        if ($scope.filter.tipoFiltragem != valorAnterior) {
                            $scope.filter.valorFiltro = "";
                        }

                        $scope.respSituacao = false;
                        $scope.respAtividades = false;
                        $scope.respArConhecimento = false;
                        if ($scope.filter.tipoFiltragem == 0) {
                            getSetor(null, null, null, null, null, null);
                        }
                        if ($scope.filter.tipoFiltragem == 1) {
                            getSetor('Centro', null, null, null, null, null);
                        }
                        if ($scope.filter.tipoFiltragem == 2) {
                            getAtividade(null, null, null, null, null, null);
                        }
                        if ($scope.filter.tipoFiltragem == 3) {
                            getArConhecimento(null, null, null, null, null, null);
                        }
                        if ($scope.filter.tipoFiltragem == 4) {
                            getSituacao(null, null, null, null, null, null);
                        }

                        if ($scope.filter.tipoFiltragem == 6) {
                            $scope.isDate = true;
                            $scope.condicoes = $scope.condicaoData;
                        } else {
                            $scope.isDate = false;
                            $scope.mostrarDatePicker = false;
                            if ($scope.filter.condicaoFiltragem > 1) {
                                $scope.filter = {
                                    condicaoFiltragem: ""
                                };
                            }
                            $scope.condicoes = $scope.condicaoComum;
                        }
                        if ($scope.filter.tipoFiltragem == 5) {
                            if ($scope.filter.condicaoFiltragem > 0) {
                                $scope.filter = {
                                    condicaoFiltragem: ""
                                };
                            }
                            getSituacao(null, null, null, null, null, null);
                            $scope.condicoes = $scope.condicaoParticipante;
                        }
                        valorAnterior = $scope.filter.tipoFiltragem;
                    }
                };
                //Datepicker UI-Bootstrap
                $scope.inlineOptions = {
                    customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: true
                };
                $scope.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };
                $scope.toggleMin = function () {
                    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                };
                $scope.toggleMin();
                $scope.openCalendar = function () {
                    $scope.popup.opened = true;
                };
                $scope.setDate = function (year, month, day) {
                    $scope.dt = new Date(year, month, day);
                };
                $scope.popup = {
                    opened: false
                };
                function getDayClass(data) {
                    var date = data.date,
                            mode = data.mode;
                    if (mode === 'day') {
                        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                        for (var i = 0; i < $scope.events.length; i++) {
                            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
                            if (dayToCheck === currentDay) {
                                return $scope.events[i].status;
                            }
                        }
                    }
                    return '';
                }
                //fim datepicker

//                Informações: 
                $scope.respPart = false;
                $scope.respInf = false;
                function getProjetosInfo(prjCodigo) {
                    $scope.buscandoProjetosInf = true;
                    $http({
                        method: 'POST',
                        url: './prjAtvExtensao/pesquisa',
                        params: {
                            filter: '[{property:"prjNumero",value:"' + prjCodigo + '"}]',
                            map: "complete"
                        }
                    }).then(function succesCallBack(response) {
                        $scope.projetoComplete = response.data.data[0];
                        if ($scope.projetoComplete.projeto.prjCampus.strCodigo.strCodigo == $scope.projetoComplete.projeto.strProjeto.strCodigo) {
                            $scope.projetoComplete.projeto.strProjeto.strDescricao = "";
                        }
                        $scope.buscandoProjetosInf = false;
                        $scope.respInf = false;
                    }, function errorCallBack(response) {
                        $scope.buscandoProjetosInf = false;
                        $scope.respInf = true;
                    });

                }
                ;
                function getPrjHstParticipante(prjCodigo) {
                    $scope.buscandoParticipantes = true;

                    $http({
                        method: 'POST',
                        url: './prjHstParticipante/pesquisa',
                        params: {
                            filter: '[{property:"projeto.prjNumero",value:"' + prjCodigo + '"}]',
                            sort: '[{property:"pssFscCodigo.pssFscNome",direction:"ASC"}]',
                            map: null,
                            extraParams: null
                        }
                    }).then(function succesCallBack(response) {
                        $scope.PrjHstParticipante = response.data.data;
                        for (var i = 0, max = $scope.PrjHstParticipante.length; i < max; i++) {
                            if ((i % 2) == 0) {
                                $scope.PrjHstParticipante[i].class = "success";
                            } else {
                                $scope.PrjHstParticipante[i].class = "warning";

                            }
                        }
                        $scope.buscandoParticipantes = false;
                        $scope.respPart = false;
                    }, function errorCallBack(response) {
                        $scope.buscandoParticipantes = false;
                        $scope.respPart = true;
                    });
                }
                ;
            });
})();